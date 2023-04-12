const express = require("express");
const axios= require("axios");
const bodyParser = require("body-parser");
const cors= require("cors")
const app = express();
app.use(bodyParser.json());
app.use(cors())


app.post("/events",(req,res)=>{

    axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/events',
        data: req.body
      }).then(r=>{
        console.log("send")
    }).catch(e=>{
        console.log("error");
        console.log(e.message)
    });

    axios({
        method: 'post',
        url: 'http://127.0.0.1:4001/events',
        data: req.body
      }).then(r=>{
        console.log("send")
    }).catch(e=>{
        console.log("error");
    });
    res.send("Ok");
})




app.listen(4005, () => {
    console.log("Event bus on port 4005");
  });
  