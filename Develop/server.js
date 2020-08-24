var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

notes = [];

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

let noteData = [];

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    noteData.push(newNote);
    noteData.map((noteObject, i) => noteObject.id = i + 1);

    fs.writeFile("./db/db.json", JSON.stringify(noteData), function(error){
        res.json(noteData);
        if (error) {
            return console.log(error);
        }
        console.log('SUCCESS!');
    });

});

app.delete("/api/notes/:id", function (req, res) {
    id = req.params.id;
    
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        jsonData = JSON.parse(data);
        jsonData.splice(id - 1, 1);
        jsonData.map((noteObject, i) => noteObject.id = i + 1);
      
        console.log(jsonData);
        
        fs.writeFile("./db/db.json", JSON.stringify(jsonData), function () {
            res.json(jsonData);
        });
    });
    
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