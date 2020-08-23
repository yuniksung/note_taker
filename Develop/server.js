var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

notes = [];

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
    //return res.json()
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    // notes.push(newNote);
    // res.json(newNote);
    // //saveNote(newNote);
    // fs.appendFile("db.json", newNote, function(error){
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log("Success!");
    // });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});