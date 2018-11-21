const express = require("express");
const app = express();
const request = require("request");

//Sets the public folder as the external file folder
app.use(express.static("public"));

//Officially sets the view engine as ejs, therefore setting the default file type for readering to .ejs
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("homepage");
});

app.get("/game/:gameTitle/:gameCreator", function (req, res) {
    const title = req.params.gameTitle;
    const creator = req.params.gameCreator;
    res.render("game", {
        title: title,
        creator: creator
    });
});

app.get("/list", function (req, res) {

    const games = [{
            title: "Fortnite",
            creator: "Epic Games"
        },
        {
            title: "Dirty Bomb",
            creator: "Splash Damage"
        },
        {
            title: "Battlefield 1",
            creator: "EA"
        }
    ]

    res.render("list", {
        gamesList: games
    });
});

app.get("/pics/:page", function (req, res) {
    var pageNumber = req.params.page;
    request("https://api.unsplash.com/photos/?client_id=a23535d66eec2d81f1d9aea445095e620bf47ec2df2b80266d2b7b92adf2d844&page=" + pageNumber, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(body);
            res.render("pictures", {
                picData: data,
                pageNumber: pageNumber
            });
        }
    });
});

//Route if they dont provide a page number
app.get("/pics", function (req, res) {
    var pageNumber = req.params.page;
    request("https://api.unsplash.com/photos/?client_id=a23535d66eec2d81f1d9aea445095e620bf47ec2df2b80266d2b7b92adf2d844", function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(body);
            res.render("pictures", {
                picData: data,
                pageNumber: 1
            });
        }
    });
});

app.listen("3000", function () {
    console.log("Gaming Website has started up! Made by Illuminati Productions.");
});