const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const article = mongoose.model("article", articleSchema);

app.get('/articles', (req, res) => {
    article.find(function(err, foundArticles) {
        if (!err){
        res.send(foundArticles);
        } else {
            res.send(err);
        }
    });

});

app.post("/articles", (req, res) => {

  const newArticle = new article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save((err) => {
    if(!err) {
      res.send("Successfully added a new article");
    } else {
      res.send(err);
    }
  });
});

app.delete('/articles', (req, res) => {
  article.deleteMany((err) => {
    if (!err) {
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");

});
