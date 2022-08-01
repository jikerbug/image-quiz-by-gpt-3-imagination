
const url = 'https://api.openai.com/v1/completions'

const { apikey, OrganizationID} = require('../config.json');
const request = require('request');

const description = `Mark a famous painter and designer with incredible perception and imagination. create a set of drawings showing random animal in creative and imaginary way, with detailed description as it can be.`; 
const promptExampleList = [
    `1. lion with geometric shapes in its mane and fur in arabian tile style.
    2. elephant with big ears, a trunk that is more like a spiral staircase, and tusks made of colorful candy.
    3. `,
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  


module.exports = {
  async getTalk(text) {
    const prompt = description + '\nMark lives on Mars and misses the animals of Earth.'+ '\nme: ' + text + '\nMark:'
    const options = {
        headers: {'content-type' : 'application/json', 'Authorization': 'Bearer ' + apikey, 'OpenAI-Organization': OrganizationID},
        url:     url,
        body:    JSON.stringify({
          "model": "text-davinci-002", 
          "prompt": prompt, 
          "temperature": 0.7, 
          "max_tokens": 256,
          "top_p":1,
          "frequency_penalty":0,
          "presence_penalty":0,
          "stop":['4.', '4)', 'you:']
        })
      };

    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, async function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          var json = JSON.parse(body)
          var talk = await json["choices"][0]["text"]; 
          console.log(talk)
          console.log(prompt)
          resolve(talk);
        }
      })
    })
  },
  async getImagination(animal) {
    const prompt = description + '\n' + promptExampleList[getRandomInt(1)] + animal;
    console.log(prompt)
    const options = {
        headers: {'content-type' : 'application/json', 'Authorization': 'Bearer ' + apikey, 'OpenAI-Organization': OrganizationID},
        url:     url,
        body:    JSON.stringify({
          "model": "text-davinci-002", 
          "prompt": prompt, 
          "temperature": 1, 
          "max_tokens": 30,
          "top_p":1,
          "frequency_penalty":2.0,
          "presence_penalty":1.0,
          "stop":['4.']
        })
      };

    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, async function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          var json = JSON.parse(body)
          var imagine = await json["choices"][0]["text"]; 
          resolve(imagine);
        }
      })
    })
  }
}