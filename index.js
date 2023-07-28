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

var answer = "";
app.get("/getsentiment", async(req,res) => {
  answer = await functions.getSentimentAnalysis();
  console.log(answer);
  res.send(answer);
})

app.post("/register", async(req,res) =>{
})

app.post("/login", (req,res) => {

})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sentiment analysis API listening on port ${PORT}`);
});
