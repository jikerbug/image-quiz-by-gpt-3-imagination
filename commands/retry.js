const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
var getDrawing = require('../functions/getDrawing')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('retry')
    .setDescription('Replies with another ai generated animal quiz. same way as previous one')
                                    ,
  async execute(interaction) {  
        var user = interaction.user.tag
        var { userQuizDict } = require('./../commands/quiz');
        const quizDict = userQuizDict[user]
        if(typeof quizDict === 'undefined'){
            interaction.reply('get new Quiz First!!');
            return;
        }
        console.log(user)
        await interaction.deferReply()
        
        quizDict['retry'] += 1
        console.log(quizDict)

        var base64Data = await getDrawing(quizDict["description"]);
  
        require("fs").writeFile("out.png", base64Data, 'base64', async function(err) {
          
          if(err){
            console.log(err);
          }
          const drawing = new MessageAttachment("out.png");
        
          const embed = new MessageEmbed()
            .setDescription('Quiz : <Guess X! Choose an animal emoji for X>\n' + quizDict["quiz"])
            .setColor("#5104DB")
            .setFooter({ text: "drew by Mark in Mars" })
            .setTimestamp();
          interaction.followUp({files: [drawing], embeds: [embed]});
          const message = await interaction.fetchReply();
		      message.react('❤️');
          userQuizDict[`${interaction.user.tag}`] = quizDict
          console.log(userQuizDict)
 
        });     
  },
};




