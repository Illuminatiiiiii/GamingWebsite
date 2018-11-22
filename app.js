const express = require("express");
const app = express();
const request = require("request");
 
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
 
    res.render("list", {
        gamesData: gamesData
    });
});
 
app.listen("3000", function(){
    console.log("Gaming Website has started up! Made by Illuminati Productions.");
});