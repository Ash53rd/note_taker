const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    );
    newNote.id = noteList.length.toString();
    noteList.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(noteList)
    );
    res.json(noteList);
  });

  app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    );
    let noteId = req.params.id;
    let newNoteList = noteList.filter((note) => note.id !== noteId);
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(newNoteList)
    );
    res.json(newNoteList);
  });
};
