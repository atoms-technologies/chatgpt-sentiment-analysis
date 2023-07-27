const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
app.use(fileupload());
const fs = require('fs');
const functions = require('./sentimentAnalysis.js');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');

app.get("/", (req,res,next) => {
    res.status(200).send("Hello World");
});

app.post("/upload", (req,res, next) => {
    const file = req.files.doc;
    file.mv("./uploads/" + file.name , function(err, result){
        if(err){
            throw err;
        }

        res.send({
            success: true,
            message: "file uploaded!"
        });
    });
});

var ans = "";
app.get("/getsentiment", async(req,res) => {
  ans = await functions.getSentimentAnalysis();
  console.log(ans);
  res.send(ans);
})

app.post("./user/generatetoken", (req, res) =>{
  let jwtsecretkey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    user_id: 32, // randomly defined
  }

  const token = jwt.sign(data, jwtsecretkey);
  res.send(token);
})

app.get("/user/validatetoken", (req, res) =>{
  let tokenheaderkey = process.env.TOKEN_HEADER_KEY;
  let jwtsecretkey = process.env.JWT_SECRET_KEY;
  const token = req.header(tokenheaderkey);
  const verified = jwt.verify(token, jwtsecretkey)
  if(verified){
    return res.send("user authenticated successfully");
  }else{
    return res.status(401).send(error);
  }
})

app.listen(3000, () => {
  console.log("Sentiment analysis API listening on port 3000!");
});