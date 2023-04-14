const express= require("express");
const {randomBytes} = require("crypto");
const bodyParser= require("body-parser");
const cors= require("cors")
const axios = require("axios");


const app= express();
app.use(bodyParser.json());
app.use(cors())

const posts={}


app.get("/posts",(req,res)=>{
    res.send(posts);

})

app.post("/posts",(req,res)=>{
    const id= randomBytes(4).toString();
    const {title}= req.body;
    posts[id]={
        title,id 
    }

    axios({
        method: 'post',
        url: 'http://127.0.0.1:4005/events',
        data: {
            type:"PostCreated",
            data:{
              id,
              title,
            }
        }
      }).catch(e=>{
        console.log("error");
    });

 

    res.status(201).send(posts[id]);


})

app.post("/events",(req,res)=>{
    console.log(req.body)
    res.send({})
  })

app.listen(4000,()=>{
    console.log("Posts on port 4000")
})