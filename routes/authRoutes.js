module.exports = (app, passport) => {
  // create an endpoint for Google authentication
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // successful authentication, redirect to homepage
      res.redirect("/notes");
    }
  );

  // middleware to check if the user is authenticated
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

  // protected route
  app.get("/notes", isAuthenticated, (req, res) => {
    res.sendFile(process.cwd() + "/public/notes.html");
  });

  app.get("/", (req, res) => {
    // res.send('Hello World!');
    res.sendFile(process.cwd() + "/public/home.html");
  });

  app.get("/editNote?:id?", isAuthenticated, (req, res) => {
    res.sendFile(process.cwd() + "/public/editNote.html");
  });

  app.post("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/");
  });
}