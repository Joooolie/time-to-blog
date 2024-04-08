// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
//router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);

// OLD STUFF
import bodyParser from "body-parser";

//const app = express();
//const port = 3000;

api.use(express.static("public"));

api.use(bodyParser.urlencoded({ extended: true }));

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

api.use(addNewPost);

router.get("/api/", (req, res) => {
  res.render("index.ejs", {
    allPosts : posts
  });
});

router.get("/api/new-post", (req, res) => {
  res.render("new-post.ejs");
});

router.post("/api/submit", (req, res) => {
  res.redirect("/");
});

router.get("/api/new-post", (req, res) => {
  res.render("new-post.ejs");
});

router.get("/api/edit", (req, res) => {
  currentPostId = req.query.postid;
  res.render("edit-post.ejs", {
    editablePost : posts[currentPostId],
  });
});

router.post("/api/submit-edit", (req, res) => {
  newTitle = req.body["new-title"];
  newContent = req.body["new-content"];
  if (newTitle && newContent && currentPostId) {
    posts[currentPostId].title = newTitle;
    posts[currentPostId].content = newContent;
    currentPostId = null;
  }
  
  res.redirect("/api/");
});

router.get("/api/delete", (req, res) => {
  posts.splice(req.query.postid, 1);
  res.redirect("/api/");
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
