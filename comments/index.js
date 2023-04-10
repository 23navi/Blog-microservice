const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString();
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content: req.body.content });
  commentsByPostId[postId] = comments;

  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log("Comments on port 4001");
});
