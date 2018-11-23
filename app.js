const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

//Connecting to the mongodb database(we use mlab)
mongoose.connect("mongodb://kody:work123@ds145752.mlab.com:45752/gaming_website_database", {
    useNewUrlParser: true
});

//Game data template & model
var gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
    width: Number,
    height: Number,
    fileName: String,
    thumbnailFile: String
});
var Game = mongoose.model("Game", gameSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
 
app.set("view engine", "ejs");
 
app.get("/", function(req, res){
    res.render("homepage"); 
});

//This route is currently too complicated. Look at all of the parameters. Booboo. Lets make it better.
// app.get("/game/:title/:creator/:width/:height/:fileName/:thumbnailFile", function(req, res){
//     res.render("game", {
//         title: req.params.title,
//         creator: req.params.creator,
//         width: req.params.width,
//         height: req.params.height,
//         fileName: req.params.fileName,
//         thumbnailFile: req.params.thumbnailFile
//     });
// });

app.get("/game/:id", function(req, res){
    var id = req.params.id;
    //Method given by mongoose that lets u find the document by its id
    Game.findById(id, function(error, foundGame){
        if(error){
            res.send("Error locating game. ID might not exist anymore.");
        }else{
            res.render("game", {
                title: foundGame.title,
                creator: foundGame.creator,
                width: foundGame.width,
                height: foundGame.height,
                fileName: foundGame.fileName,
                thumbnailFile: foundGame.thumbnailFile
            });
        }
    });
});
 
app.get("/list", function(req, res){ 
    Game.find({}, function(error, data){ //Getting the documents from the collection, and returning it into the variable data, which we send over while rendering the list page.
        if(error){
            console.log("Problem finding data");
        }else{
            res.render("list", {
                gamesData: data
            });
        }
    });
});

app.get("/addgame", function(req, res){
   res.render("addgame"); 
});

app.post("/addgame", function(req, res){
    var data = req.body;
    Game.create({ //Still takes data from the post request from the form, but uses that data to create a new Game document that will be added to the Games collection.
        title: data.title,
        creator: data.creator,
        width: data.width,
        height: data.height,
        fileName: data.fileName,
        thumbnailFile: data.thumbnailFile
    }, function(error, data){
        if(error){
            console.log("Problem adding game data to collection");
        }else{
            console.log("Game added to the database!: ");
            console.log(data);
        }
    });
    res.redirect("/list");
});

app.listen("3000", function(){
    console.log("Gaming Website has started up! Made by Illuminati Productions.");
});