const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const post_with_comments = {};

app.get("/posts", (req, res) => {
  res.send(post_with_comments);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type == "CommentCreated") {
    if (post_with_comments[data.postId]) {
      post_with_comments[data.postId].comments.push({
        id: data.commentId,
        content: data.content,
        status: data.status,
      });
    }
  }

  if (type == "PostCreated") {
    post_with_comments[data.id] = {
      id: data.id,
      title: data.title,
      comments: [],
    };
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("Event bus on port 4002");
});
