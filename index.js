import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var posts = [];
var latestTitle, latestContent;

function updateLatestPost(req, res, next) {
    latestTitle = req.body["title"];
    latestContent = req.body["content"];
    if (latestTitle && latestContent) {
        posts.push({title: latestTitle, content: latestContent});
    }
    
    next();
}

app.use(updateLatestPost);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    allPosts : posts
  });
});

app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
});

app.post("/submit", (req, res) => {
    res.render("index.ejs", 
    {allPosts : posts 
    }
    );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
