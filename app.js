const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

//Connecting to the mongodb database(we use mlab)
mongoose.connect("mongodb://kody:work123@ds145752.mlab.com:45752/gaming_website_database", {
    useNewUrlParser: true
});

//Our template for our data when we store it
var gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
    width: Number,
    height: Number,
    fileName: String,
    thumbnailFile: String
});

//Making that template into a model we can use to add, delete, and find out data. This model will be made into the Games collection when we start adding data.
var Game = mongoose.model("Game", gameSchema);

//Creating a new piece of data. (a new game object)
// var testgame = new Game({
//     title: "Booty Master",
//     creator: "Jesus",
//     width: 480,
//     height: 680,
//     fileName: "Yeet.swf",
//     thumbnailFile: "imapicture.jpg"
// });

// //Adding that data to our database
// testgame.save(function(error, data){
//     if(error){
//         console.log("There was an error saving the data");
//     }else{
//         console.log("Data saved to datbase. Here is the data that was saved: ");
//         console.log(data);
//     }
// });

//Easier way to add to the database
Game.create({
    title: "Booty Master",
    creator: "Jesus",
    width: 480,
    height: 680,
    fileName: "Yeet.swf",
    thumbnailFile: "imapicture.jpg"
}, function(error, data){
    if(error){
        console.log("Problem adding data to collection");
    }else{
        console.log("Data added: ");
        console.log(data);
    }
});

//Listing all of the Games in the collection
Game.find({}, function(error, data){
    if(error){
        console.log("Problem finding data");
    }else{
        console.log("Here is all of the data in the Games collection: ");
        console.log(data);
    }
})

//Our ghetto database
const gamesData = [
    {
        title: "American Racing", 
        creator: "turboNuke",
        width: 640,
        height: 480,
        fileName: "americanracing.swf",
        thumbnailFile: "americanracingpicture.jpg"
    },
    {
        title: "Generic Defense Game", 
        creator: "PyschoGoldfish",
        width: 640,
        height: 480,
        fileName: "genericdefense.swf",
        thumbnailFile: "GenericDefenseGame.png"
    },
    {
        title: "Learn to Fly 2", 
        creator: "light_bringer777",
        width: 640,
        height: 480,
        fileName: "embeddable_115608.swf",
        thumbnailFile: "ltf2.jpg"
    },
    {
        title: "Wonderputt", 
        creator: "dampgnat",
        width: 750,
        height: 650,
        fileName: "wonderputt.swf",
        thumbnailFile: "pop-wonderputt.jpg"
    }
]

app.use(bodyParser.urlencoded({ extended: true }));
 
//Sets the public folder as the external file folder
app.use(express.static("public"));
 
//Officially sets the view engine as ejs, therefore setting the default file type for readering to .ejs
app.set("view engine", "ejs");
 
app.get("/", function(req, res){
    res.render("homepage"); 
});
 
app.get("/game/:title/:creator/:width/:height/:fileName/:thumbnailFile", function(req, res){
    res.render("game", {
        title: req.params.title,
        creator: req.params.creator,
        width: req.params.width,
        height: req.params.height,
        fileName: req.params.fileName,
        thumbnailFile: req.params.thumbnailFile
    });
});
 
app.get("/list", function(req, res){ 
 
    res.render("list", {
        gamesData: gamesData
    });
});

//GET Method for /addgame route
app.get("/addgame", function(req, res){
   res.render("addgame"); 
});

//POST Method for /addgame route
app.post("/addgame", function(req, res){
    var data = req.body;
    gamesData.push(data);
    res.redirect("/list");
});

app.listen("3000", function(){
    console.log("Gaming Website has started up! Made by Illuminati Productions.");
});