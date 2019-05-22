//Scraping
const cheerio = require("cheerio");
const axios = require("axios");

//request logging
const logger = require("morgan");

//server/db stuff
const express = require("express");
const mongoose = require("mongoose");

//set up server
const app = express();
const PORT = 3000;

//set up db
const db = require("./models");

//set up handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoscraper", { useNewUrlParser: true });




app.get("/scrape", (req, res) => {
    res.send("Hello World");
    axios.get("https://www.nytimes.com/section/science").then(response => {
        const $ = cheerio.load(response.data);


        $("h2", "article").each((i, element) => {
            const result = {};
            result.title = $(element).children().text();
            result.summary = $(element).next().text();
            result.href = "https://www.nytimes.com/" + $(element).children().attr("href");
            result.imgSrc = $(element).parent().prev().find("img").attr("src");

            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });
    })


});

app.get("/articles", (req, res) => {
        db.Article.find({})
            .then(data => {
                const hbarsObj = {
                    article: data
                }
                res.render("index",hbarsObj);
            })
            .catch(err => res.json(err));
});
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
