var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://news.ycombinator.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      $(".athing").each(function(i, element) {
        // Save an empty result object
        var result = {};
        console.log(element);
        // Add the text and href of every link, and save them as properties of the result object
        // result.title = $(this)
        //   .children("db")
        //   .text();
        // result.link = $(this)
        //   .children("db")
        //   .attr("href");
  
        // Create a new Article using the `result` object built from scraping
        // db.Article.create(result)
        //   .then(function(dbArticle) {
        //     // View the added result in the console
        //     console.log(dbArticle);
        //   })
        //   .catch(function(err) {
        //     // If an error occurred, log it
        //     console.log(err);
        //   });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
})
