const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');


mongoose.connect("mongodb://booty:booty123@ds023078.mlab.com:23078/youtube", {
    useNewUrlParser: true
}, function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Connected to the database");
    }
});

var gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
    width: Number,
    height: Number,
    fileName: String,
    thumbnailFile: String
});

var Game = mongoose.model("Game", gameSchema);

// const games = [{
//     title: "Learn to Fly 2",
//     creator: "light_bringer777",
//     width: 640,
//     height: 480,
//     fileName: "learntofly2.swf",
//     thumbnailFile: "Learn_To_Fly_2.jpg"
// },
// {
//     title: "Run 3",
//     creator: "player_03",
//     width: 800,
//     height: 600,
//     fileName: "run3.swf",
//     thumbnailFile: "run3.jpg"
// },
// {
//     title: "Continuity",
//     creator: "glimajr",
//     width: 640,
//     height: 480,
//     fileName: "continuity.swf",
//     thumbnailFile: "booty.png"
// }
// ]
 
//Sets the public folder as the external file folder
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
 
//Officially sets the view engine as ejs, therefore setting the default file type for readering to .ejs
app.set("view engine", "ejs");

app.use(fileUpload());
 
app.get("/", function (req, res) {
    res.render("homepage");
});

app.get("/game/:id", function (req, res) {
    var id = req.params.id;

    Game.findById(id, function(error, foundGame){
        if(error){
            console.log("Couldn't find game with that id:");
        }else{
            res.render("game", {
                title: foundGame.title,
                creator: foundGame.creator,
                width: foundGame.width,
                height: foundGame.height,
                fileName: foundGame.fileName
            });
        }
    });
});
 
app.get("/list", function (req, res) {
 
    Game.find({}, function(error, games){
        if(error){
            console.log("There was a problem retrieving all of the games from the database.");
            console.log(error);
        }else{
            res.render("list", {
                gamesList: games
            });
        }
    });

});

app.get("/addgame", function(req, res){
    res.render("addgame");
});

app.post("/addgame", function(req, res){
    var data = req.body;

    //a variable representation of the files
    var gameFile = req.files.gamefile;
    var imageFile = req.files.imagefile;

    //Using the files to call upon the method to move that file to a folder
    gameFile.mv("public/games/" + gameFile.name, function(error){
        if(error){
            console.log("Couldn't upload the game file");
            console.log(error);
        }else{
            console.log("Game file succesfully uploaded.");
        }
    });
    imageFile.mv("public/games/thumbnails/" + imageFile.name, function(error){
        if(error){
            console.log("Couldn't upload the image file");
            console.log(error);
        }else{
            console.log("Image file succesfully uploaded.");
        }
    });
    
    Game.create({
        title: data.title,
        creator: data.creator,
        width: data.width,
        height: data.height,
        fileName: gameFile.name,
        thumbnailFile: imageFile.name
    }, function(error, data){
        if(error){
            console.log("There was a problem adding this game to the database");
        }else{
            console.log("Game added to database");
            console.log(data);
        }

    });
    res.redirect("/list");
});
 
app.listen("3000", function () {
    console.log("Gaming Website has started up! Made by Illuminati Productions.");
});