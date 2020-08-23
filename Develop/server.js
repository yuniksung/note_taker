var express = require("express");
var path = require("path");
var fs = require("fs");
// var db = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

notes = [];



app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
    // fs.readFile("db/db.json", "utf8", function(error, data){
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(data);
    // });
    //return res.json()
});

let noteData = [];
let id = 1;

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = id++;
    noteData.push(newNote);
    console.log(noteData);

    fs.writeFile("./db/db.json", JSON.stringify(noteData), function(error){
        res.json(noteData);
        if (error) {
            return console.log(error);
        }
        console.log('SUCCESS!');
    });

});

app.delete("/api/notes/:id", function (req, res) {
    // var id = req.params.id;

    // fs.writeFile("./db/db.json", JSON.stringify(db), function () {
    //     res.json(db);
    // });
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});