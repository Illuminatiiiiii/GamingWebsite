const express = require("express");
const app = express();
const request = require("request");
var convert = require('xml-js');

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

//Testing our HTTP Request
// request("http://www.google.com", function(error, response, body){
//     if(error){
//         console.log("There was an error:");
//         console.log(error);
//     }else{
//         console.log(body);
//         console.log("Response Code: " + response.statusCode);
//     }
// });
//Making requests from an actual API
// request("https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
//     if(error){
//         console.log("There was an error:");
//         console.log(error);
//     }else{
//         var jsonData = JSON.parse(body);
//         console.log(jsonData.query.results.channel.wind.chill);
//     }
// });
//One More Example!!!
app.get("/books", function (req, res) {
    request("https://api.unsplash.com/photos/?client_id=a23535d66eec2d81f1d9aea445095e620bf47ec2df2b80266d2b7b92adf2d844&", function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            res.send(JSON.parse(body)[1].urls.raw); //Raw Image
        }
    });
})

app.listen("3000", function () {
    console.log("Gaming Website has started up! Made by Illuminati Productions.");
});