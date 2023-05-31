const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
  console.log("Received Event on event-bus");
  //To post service
  axios({
    method: "post",
    url: "http://posts-clusterip-srv:4000/events",
    data: req.body,
  }).catch((e) => {
    console.log("error post");
    console.log(e.message);
  });

  //To comments service
  axios({
    method: "post",
    url: "http://comments-clusterip-srv:4001/events",
    data: req.body,
  }).catch((e) => {
    console.log("error comment");
  });

  //To query service
  axios({
    method: "post",
    url: "http://query-clusterip-srv:4002/events",
    data: req.body,
  }).catch((e) => {
    console.log("error query");
  });

  //To moderation service
  axios({
    method: "post",
    url: "http://moderation-clusterip-srv:4003/events",
    data: req.body,
  }).catch((e) => {
    console.log("error query");
  });

  res.send("Ok");
});

app.listen(4005, () => {
  console.log("Event bus on port 4005");
});
