import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var posts = [];
var latestTitle, latestContent, newTitle, newContent;
var currentPostId;

function addNewPost(req, res, next) {
    latestTitle = req.body["title"];
    latestContent = req.body["content"];
    if (latestTitle && latestContent) {
        posts.push({title: latestTitle, content: latestContent});
    }
    
    next();
}

app.use(addNewPost);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    allPosts : posts
  });
});

app.get("/new-post", (req, res) => {
  res.render("new-post.ejs");
});

app.post("/submit", (req, res) => {
  res.redirect("/");
});

app.get("/new-post", (req, res) => {
  res.render("new-post.ejs");
});

app.get("/edit", (req, res) => {
  currentPostId = req.query.postid;
  res.render("edit-post.ejs", 
    //currentPostId : req.query.postid
  );
});

app.post("/submit-edit", (req, res) => {
  newTitle = req.body["new-title"];
  newContent = req.body["new-content"];
  if (newTitle && newContent && currentPostId) {
    posts[currentPostId].title = newTitle;
    posts[currentPostId].content = newContent;
    currentPostId = null;
  }
  
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  posts.splice(req.query.postid, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
