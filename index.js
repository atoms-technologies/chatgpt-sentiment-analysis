const express = require( 'express' );
const app = express();
const fileupload = require( 'express-fileupload' );
const fs = require( 'fs' );
const sentimentAnalysis = require( './sentimentAnalysis.js' );

app.use( fileupload() );

let filename = "";
app.post( "/upload", ( req, res, next ) => {
    const file = req.files != null ? req.files.doc : res.send({ message: "Upload a valid file!" });
    file.mv( "./uploads/" + file.name , function( err, result ){
        filename += file.name;
        if( err ){
            throw err;
        }

        res.send({
            success: true,
            message: "file uploaded!"
        });
    });
});

app.get( "/sentiment", async( req, res ) => {
    let answer = "";
    answer = await sentimentAnalysis.getSentimentAnalysis( filename );
    console.log( answer );
    res.send( answer );
})

let PORT = process.env.PORT || 8000;
app.listen( PORT, () => {
    console.log( `Sentiment analysis API listening on port ${PORT}` );
});