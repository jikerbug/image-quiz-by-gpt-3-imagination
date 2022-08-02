
const url = 'https://api.openai.com/v1/completions'

const { apikey, OrganizationID} = require('../config.json');
const request = require('request');

const description = `Mark is a famous painter and designer with incredible perception and imagination. create a set of drawings showing random animal in creative and imaginary way and explain it with detailed imaginary description as it can be. There is only explanation about extraordinary characteristics.`; 
const promptExampleList = [
    `1. lion with geometric shapes in its mane and fur in arabian tile style.
    2. elephant with big ears, a trunk that is more like a spiral staircase, and tusks made of colorful candy.
    3. rabbit with human-like features and clothing, inspired by medieval tapestries.
    4. owl with big eyes, a beak that looks like it is made of wood, and feathers that are different shades of blue.
    5. zebra with polka dot stripes, and a mane and tail made of rainbow feathers.
    6. cat with wings like a butterfly, and flowers instead of fur.
    7. goat with a beard made of stars and planets, and horns that are spiral galaxies
    8. blowfish with a shell that is a map of the world, and spikes that are countries' flags.
    9. giraffe with a long neck and spots that are Hello Kitty inspired
    10. turtle with a hard shell that is made of different kinds of strawberries, and a soft body with patterns inspired by the sun and the moon.
    11. `,
    `1. sheep with a wool coat that is made of different colors and textures, inspired by painting from the Rennaissance period., in doodle style,
    2. rooster with feathers made of different colors of plants, and a beak that is a watering can.
    3. eagle with a body made of the sun and stars, and wings that are comets.
    4. flamingo that is made entirely of different kinds of flowers.
    5. bird with a body that looks like stained glass, and wings made of different colors of fire.
    6. kangaroo with a joey in its pouch that is also a kangaroo, and they both have furry tails that are stars.
    7. blowfish with a shell that is made of different kinds of berries, and spikes that are leaves.
    8. dolphin made out of different kinds of shells, with a tail that splashes water into the air, creating a rainbow.
    9. snake move sinuously, their body undulating in a spiral pattern that creates the illusion of a never-ending Mobius strip.
    10. parrot dives into a pool of blue paint, creating abstract patterns in the water.
    11. `,
    `1. duck with a bill that is a fork, and eyes that are spoons.
    2. `
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  


module.exports = {
  async getTalk(text) {
    const prompt = description + '\nMark is a robot who lives on Mars and misses the animals of Earth.'+ '\nme: ' + text + '\nMark:'
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
          "stop":['3.', '3)', 'me:']
        })
      };

    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, async function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          var json = await JSON.parse(body)
          // if(typeof await json["choices"] === 'undefined'){
          //   resolve("Error : Communication with Mars was not smooth. sorry.")
          //   return;
          // }
          var talk = await json["choices"][0]["text"]; 
          console.log(talk)
          console.log(prompt)
          resolve(talk);
        }
      })
    })
  },
  async getImagination(animal) {
    const prompt = description + '\n' + promptExampleList[getRandomInt(2)] + animal;
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
          "stop":['12.']
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