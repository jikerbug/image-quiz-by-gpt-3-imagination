
const url = 'https://api.openai.com/v1/completions'

const { apikey, OrganizationID} = require('../config.json');
const request = require('request');

const description = `Mark is a famous painter and designer with incredible perception and imagination. Mark likes to design fancy things with animal shapes. He creates a set of drawings showing animal in creative and imaginary way and explain it with imaginary description. There is only explanation about extraordinary characteristics.`; 

const designerPromptExampleList =[
  `1. duck shaped cutlery set with a bill that is a fork, and eyes that are spoons.
  2. lion shaped table with geometric shapes in its mane and fur in arabian tile style.
  3. elephant shaped staircase, a trunk that is more like a spiral staircase, and tusks made of colorful candy
  4. rabbit shaped chandelier, inspired by medieval tapestries.
  5. owl shaped bookmark clock with big eyes, a beak that looks like it is made of wood, and feathers that are different shades of blue.
  6. goat shaped spaceship with a beard made of stars and planets, and horns that are spiral galaxies.
  7. blowfish shaped globe with a shell that is a map of the world, and spikes that are countries' flags.
  8. sheep shaped coat with a wool coat that is made of different colors and textures, inspired by painting from the Rennaissance period.
  9. flamingo shaped umbrella that is made entirely of different kinds of flowers.
  10. otter shaped chess set with a board that is made of water, and pieces that are otters in different positions.
  11. `, 
  `1. fox shaped kettle, oil on canvas.
  2. rabbit shaped chair, made of silver.
  3. cat shaped balloon, scribbled with chalk.
  4. lion shaped necklace, oil on canvas.
  5. dolphin shaped earring, made of colorful glass.
  6. giraffe shaped car, vector image.
  7. elephant shaped ring, Adobe Illustration Sticker Svg.
  8. rabbit shaped lamp, made of gold.
  9. dog shaped teapot, made of emerald.
  10. snail shaped bottle, made of glass.
  11. `,
  `1. otter shaped chess set with a board that is made of water, and pieces that are otters in different positions.
  2. rhino shaped tank with a horn that is a gun, and armor that is made of different kinds of metal.
  3. giraffe shaped tower with a neck that is a spiral staircase, and spots that are windows.
  4. giraffe shaped keyboard with a long neck and big eyes, inspired by ancient sculptures.
  5. zebra shaped ziploc bag with stripes that are made of different colors and patterns, inspired by traditional african art.
  6. sloth shaped coffee mug with a handle that is a branch, and leaves on the sides.
  7. deeer shaped vase with a glass body, and antlers that are branches with leaves.
  8. shark shaped lamp with a shade that is made of teeth, and a fin that doubles as a switch.
  9. blowfish shaped lightbulb with a shade that is made of different colored glass, and a X inside the shade that lights up when the lamp is turned on.
  10. koala shaped pencil case with leaves as pockets, and a eucalyptus tree as the zipper.
  11. `,
  `1. cat shaped mug, made of clay,`
]


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  

const talkDescription = '\nMark is a robot who lives on Mars and misses the animals of Earth.\nMark also misses fancy things and cool stuff of the earth.\n'

module.exports = {
  async getTalk(text) {
    const prompt = description + talkDescription + '\nme: ' + text + '\nMark:'
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
          var json = await JSON.parse(body);
          console.log(json);
          var talk = json["choices"][0]["text"]; 
          console.log(talk)
          console.log(prompt)
          resolve(talk);
        }
      })
    })
  },
  async getImagination(animal) {
    const prompt = description + '\n' + designerPromptExampleList[getRandomInt(3)] + animal;
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
          "stop":['12.', '.']
        })
      };

    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, async function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          var json = await JSON.parse(body);
          console.log(json);
          var imagine = json["choices"][0]["text"]; 
          resolve(imagine);
        }
      })
    })
  }
}