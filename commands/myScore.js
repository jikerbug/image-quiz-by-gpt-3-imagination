const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('my-score')
    .setDescription('Replies correct answer of quiz')
                                    ,
  async execute(interaction) {  
        var user = interaction.user.tag
        var { userQuizDict } = require('./../commands/quiz');
        const quizDict = userQuizDict[user]
        if(typeof quizDict === 'undefined'){
            interaction.reply('your score is 0')
            return;
        }
        console.log(user)
        interaction.reply('your score is 100')
        console.log(quizDict)

  },
};
