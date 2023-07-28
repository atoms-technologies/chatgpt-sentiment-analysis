const reader = require('any-text');
const { async } = require('node-stream-zip');
const {Configuration, OpenAIApi} = require("openai")
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)
var answer = ""

async function callChatGPT(text){
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 3000
        })
        console.log(completion.data.choices[0].text)
        answer += completion.data.choices[0].text;
    }catch (e) {
        console.log(e)
    }
    return answer;
}

var temporaryAnswer = "";
async function getSentimentAnalysis(){
    reader.getText(`./uploads/Sample-doc-file-100kb.doc`).then( async(data) => {
        temporaryAnswer += await callChatGPT("give sentiment analysis of " + data.toString());
    });
    return temporaryAnswer;
}

getSentimentAnalysis();
module.exports = {getSentimentAnalysis, callChatGPT};