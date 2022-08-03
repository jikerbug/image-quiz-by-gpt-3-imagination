
const url = 'https://api.openai.com/v1/completions'

const { apikey, OrganizationID} = require('../config.json');
const request = require('request');

const description = `Mark is a famous painter and designer with incredible perception and imagination. create a set of drawings showing random animal in creative and imaginary way and explain it with imaginary description. There is only explanation about extraordinary characteristics.`; 

const imagineDesignerPromptExampleList=[
  `Mark designs fancy things.
  1. duck shaped cutlery set with a bill that is a fork, and eyes that are spoons.
  2. lion shaped table with geometric shapes in its mane and fur in arabian tile style.
  3. elephant shaped staircase, a trunk that is more like a spiral staircase, and tusks made of colorful candy
  4. rabbit shaped chandelier, inspired by medieval tapestries.
  5. owl shaped grandfather clock with big eyes, a beak that looks like it is made of wood, and feathers that are different shades of blue.
  6. goat shaped spaceship with a beard made of stars and planets, and horns that are spiral galaxies.
  7. blowfish shaped globe with a shell that is a map of the world, and spikes that are countries' flags.
  8. sheep shaped coat with a wool coat that is made of different colors and textures, inspired by painting from the Rennaissance period.
  9. flamingo shaped perfume that is made entirely of different kinds of flowers.
  10. snake shaped belt move sinuously, their body undulating in a spiral pattern that creates the illusion of a never-ending M. obius strip.
  11. `
]

const designerPromptExampleList =[
  `Mark degisns fancy things.
  1. fox shaped kettle, oil on canvas.
  2. rabbit shaped sculpture, in stained glass style, made of silver.
  3. cat shaped window, in triangular geometrical style, scribbled with chalk.
  4. lion shaped necklace, oil on canvas.
  5. dolphin shaped earring, made of colorful glass.
  6. giraffe shaped car, vector image.
  7. elephant shaped ring, Adobe Illustration Sticker Svg.
  8. rabbit shaped lego, made of gold.
  9. dog shaped teapot, made of emerald.
  10. horse shaped papercraft, vector image.
  11. `,
  `degisn fanxy things.
  1. rooster shaped chair, in 3D cube style.
  2. swan shaped cushion, in faux fur, in pictogram style.
  3. goat shaped wallet, in zentangle style, made of onyx.
  4. rooster shaped lamp, in a Tiffany style.
  5. owl shaped wallclock, in peacock pattern style.
  6. turkey shaped balloon, in 3D style.
  7. lizard shaped bookmark, in doodle style.
  8. duck shaped umbrella, in a surrealistic style, fractal art.
  9. panda shaped pillow, in pop art style.
  10. snail shaped bottle, made of glass.
  11. `
]


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
    const prompt = description + '\n' + designerPromptExampleList[getRandomInt(1)] + animal;
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