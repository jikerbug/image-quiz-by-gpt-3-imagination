const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');


// const url = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate"
const url = "https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/"
var request = require('request');
var getDrawing = require('../functions/getDrawing');
var randomQuiz = require('../functions/randomQuiz');
var userQuizDict = require('../functions/randomQuiz');



module.exports = {
  userQuizDict,
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Replies with ai generated animal quiz by drawing it in many different ways')
                                    ,
  async execute(interaction) {
        console.log(interaction.user.tag)

        //await interaction.reply("body");
        await interaction.deferReply()


        const quizDict = await randomQuiz('drawing');

        var base64Data = await getDrawing(quizDict["description"]);
  
        require("fs").writeFile("out.png", base64Data, 'base64', async function(err) {
          
          if(err){
            console.log(err);
          }
          const drawing = new MessageAttachment("out.png");
        
          const embed = new MessageEmbed()
            .setDescription('quiz : ' + quizDict["quiz"])
            .setColor("#5104DB")
            .setFooter({ text: "drew by Mark in Mars" })
            .setTimestamp();
          await interaction.followUp({files: [drawing], embeds: [embed]});
          userQuizDict[`${interaction.user.tag}`] = quizDict
          console.log(userQuizDict)
 
        });     
  },
};




