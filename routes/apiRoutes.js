const Note = require("../models/note");

module.exports = (app) => {
  // middleware to check if the user is authenticated
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

  // get user info
  app.get("/api/user", isAuthenticated, (req, res) => {
    res.json({ name: req.user.name });
  });

  // get all notes for the current user
  app.get("/api/notes", isAuthenticated, async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  });

  // get a single note for the current user
  app.get("/api/notes/:id", isAuthenticated, async (req, res) => {
    const singleNote = await Note.findById(req.params.id);
    if (!singleNote) return res.status(404).json({ message: "Note not found" });
    res.json(singleNote);
  });

  // create a new note if it doesn't exist
  app.post("/api/notes", isAuthenticated, async (req, res) => {
    const newNote = await new Note({
      title: req.body.title,
      body: req.body.body,
      user: req.user._id
    }).save();
    res.json(newNote);
  });

  // update a note
  app.put("/api/notes/:id", isAuthenticated, async (req, res) => {
    const oldNote = await Note.findById(req.params.id);
    if (!oldNote) return res.status(404).json({ message: "Note not found" });
    oldNote.title = req.body.title;
    oldNote.body = req.body.body;
    await oldNote.save();
    res.json(oldNote);
  });

  // delete a note
  app.delete("/api/notes/:id", isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  });
}
