const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

// const url = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate"
const url = "https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/"
var request = require('request');



var animalList = ['lion', 'peacock', 'giraffe']
var styleList = ['pictogram', 'triangular geometrical', 'doodle']
var objectList = ['car', 'kettle', 'earring']

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomQuiz(){
  var description;
  var quiz;
  var animal = animalList[getRandomInt(animalList.length)];
  switch(getRandomInt(3)) {
    case 0: // style
      var style = styleList[getRandomInt(styleList.length)];
      description = animal + ", in " + style + " style"
      break;

    case 1: // object
      var object = objectList[getRandomInt(objectList.length)];
      description = animal + " shaped " + object
      break;

    case 2: // style & object
      var style = styleList[getRandomInt(styleList.length)];
      var object = objectList[getRandomInt(objectList.length)];
      description = animal + " shaped " + object + ", in " + style + " style"
      break
  }

  quiz = description.replace(animal, "X")

  quizDict = {"description": description, "quiz":quiz}

  return quizDict;

}

async function getDrawing(text) {
    const options = {
        headers: {'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify(  {
              "data": [text, 45, '256', '256', 1, 5]
          
            }),
    }
 
    console.log(text);
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          body = JSON.parse(body)
          var base64Data = body["data"][0]
          base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
          resolve(base64Data);
        }
      })
    })
  }

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Replies with ai generated animal quiz by drawing it in many different ways')
                                    ,
  async execute(interaction) {

        //await interaction.reply("body");
        await interaction.deferReply()


        const quizDict = randomQuiz();

        var base64Data = await getDrawing(quizDict["description"]);
  
        require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
          
          if(err){
            console.log(err);
          }
          const drawing = new MessageAttachment("out.png");
        
          const embed = new MessageEmbed()
            .setDescription('quiz : ' + quizDict["quiz"])
            .setColor("#5104DB")
            .setFooter({ text: "drew by ai" })
            .setTimestamp();
          interaction.followUp({files: [drawing], embeds: [embed]});
        });     
  },
};




