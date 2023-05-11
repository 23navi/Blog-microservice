
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
//cors is only require if webbrowser is going to make req to route.. but we don't need this as client will not req this service directly.
// const cors= require("cors")
const app = express();
app.use(bodyParser.json());
// app.use(cors())

app.get("/", (req, res) => {
  res.send("Naviiii");
});

app.post("/events", async (req, res) => {
  
  const { type, data } = req.body;

  if (type == "CommentCreated") {
    let { status, content } = data;
    status = content.toLowerCase().includes("fuck") ? "rejected" : "approved";

    await axios.post("http://127.0.0.1:4005/events", {
      type: "CommentModerated",
      data: {
        commentId: data.commentId,
        postId: data.postId,
        content,
        status,
      },
    }).catch(e=>{
        console.log("error moderation");
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation listening on port 4003");
});
