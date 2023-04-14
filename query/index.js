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
    
    console.log(req.body);
  const { type, data } = req.body;
  if (type == "CommentCreated") {
    console.log("This is hit at commentcreated")
    console.log(post_with_comments[data.postId].comments.push({
        id:data.commentId,
        content:data.content,
    }));
  }
  if (type == "PostCreated") {
    console.log("This is hit at postcreated")

    post_with_comments[data.id] = {
      id: data.id,
      title: data.title,
      comments: [],
    };
    console.log(post_with_comments);
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("Event bus on port 4002");
});
