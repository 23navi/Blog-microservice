const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors= require("cors")
const axios= require("axios")
const app = express();
app.use(bodyParser.json());
app.use(cors())


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

  axios.post("http://127.0.0.1:4005/events",{
    type:"CommentCreated",
    data:{
      commentId,
      postId,
      content:req.body.content,
    }
  })
  res.status(201).send(commentsByPostId[postId]);
});


app.post("/events",(req,res)=>{
  console.log(req.body)
  res.send({})
})


app.listen(4001, () => {
  console.log("Comments on port 4001");
});
