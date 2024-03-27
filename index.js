import express from "express";
//import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

//app.use(bodyParser.urlencoded({ extended: true }));

var posts = [{title:"hello", content:"there"}];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    allPosts : posts
  });
});

app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
