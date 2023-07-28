const reader = require('any-text');
const { async } = require('node-stream-zip');
const {Configuration, OpenAIApi} = require("openai")
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi( configuration )

const callChatGPT = async ( text ) => {
    let answer = "";
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 3000
        })
        console.log( completion.data.choices[0].text )
        answer += completion.data.choices[0].text;
    } catch ( err ) {
        console.log( "The chatgpt API is failed due to" + err )
    }
    return answer;
}

let temporaryAnswer = ""; // needs to be declared globally to avoid undefined
const getSentimentAnalysis = async(filename) => {
    reader.getText( `./uploads/${filename}` ).then( async( data ) => {
        temporaryAnswer += await callChatGPT( "give sentiment analysis of " + data.toString() );
    });
    return temporaryAnswer;
}

module.exports = { getSentimentAnalysis, callChatGPT };