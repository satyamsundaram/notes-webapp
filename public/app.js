document.addEventListener("DOMContentLoaded", function () {
  const userInfo = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");
  const saveNoteBtn = document.getElementById("save-note-btn");
  const notesContainer = document.getElementById("notesContainer");
  const title = document.getElementById("title");
  const body = document.getElementById("body");
  const deleteNoteBtn = document.getElementById("delete-note-btn");

  const urlParams = new URLSearchParams(window.location.search);
  const noteId = urlParams.get("id");

  // ftn to fetch and display user info
  const fetchUserInfo = async () => {
    const response = await fetch("/api/user");
    const userData = await response.json();
    userInfo.innerHTML = `Hello, ${userData.name.split(" ")[0]}.`;
  };

  // ftn to fetch and display notes
  const fetchNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    if(!data) return;
    
    notesContainer.innerHTML = "";
    data.forEach((note) => {
      const newNote = document.createElement("div");
      newNote.setAttribute("id", "note");
      newNote.innerHTML = `<h3>${note.title}</h3><p>${note.body}</p>`;
      notesContainer.appendChild(newNote);
      newNote.addEventListener("click", () => {
        window.location.href = `/editNote?id=${note._id}`;
      });
    });
  };

  // fetch a single note by id
  const fetchNote = async (id) => {
    const response = await fetch(`/api/notes/${id}`);
    const data = await response.json();
    if(!data) return;
    
    title.value = data.title;
    body.value = data.body;
  }

  // ftn to save a new note
  const saveNote = async () => {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    if (!title) return;

    const url = noteId ? `/api/notes/${noteId}` : "/api/notes";
    const method = noteId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    window.location.href = "/notes";
  };

  // delete a note
  const deleteNote = async () => {
    const response = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
    const data = await response.json();
    window.location.href = "/notes";
  };

  // ftn to logout user
  const logout = async () => {
    await fetch("/logout", { method: "POST" });
    window.location.href = "/";
  };

//   if (title) {
//     title.addEventListener("input", () => {
//         if (!(title.value)) {
//         saveNoteBtn.style.backgroundColor = "#ccc";
//         saveNoteBtn.style.cursor = "not-allowed";
//         } else {
//         saveNoteBtn.style.backgroundColor = "#333";
//         saveNoteBtn.style.cursor = "pointer";
//         }
//     });

//     title.addEventListener("keydown", (event) => {
//         if (event.key == "Enter") {
//             event.preventDefault();
//         }
//     })
//   }

//   if (body) {
//     body.addEventListener("input", () => {
//         if (!title.value) {
//             saveNoteBtn.style.backgroundColor = "#333";
//             saveNoteBtn.style.cursor = "pointer";
//         }
//     });
//  }

  // call ftn
  if (deleteNoteBtn) {
    if (!noteId) deleteNoteBtn.style.display = "none";
    else deleteNoteBtn.addEventListener("click", deleteNote);
  }
  if (userInfo) fetchUserInfo();
  if (notesContainer) fetchNotes();
  if (noteId) fetchNote(noteId);
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
  if (saveNoteBtn) saveNoteBtn.addEventListener("click", saveNote);
});
