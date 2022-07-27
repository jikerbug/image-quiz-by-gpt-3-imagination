const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-answer')
    .setDescription('Replies correct answer of quiz')
                                    ,
  async execute(interaction) {  
        var user = interaction.user.tag
        var { userQuizDict } = require('./../commands/quiz');
        const quizDict = userQuizDict[user]
        if(typeof quizDict === 'undefined'){
            interaction.reply('get Quiz First!!');
            return;
        }
        console.log(user)
        interaction.reply('the answer was ' + quizDict['animal'])
        console.log(quizDict)

  },
};




