const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Logging
console.log("Current directory:", __dirname);
console.log("Contents of current directory:", fs.readdirSync(__dirname));

// API Routes
const apiRoutes = require("./routes/apiRoutes");
apiRoutes(app);

// HTML Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
