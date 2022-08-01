
const { getTalk } = require('../functions/getText')

module.exports = {
	name: 'messageCreate',
	async execute(message) {
    const content = message.content
    if(message.author.bot)
      return;
    
    var response = await getTalk(content);
    if(response == ''){
      response = '.'
    }
    message.reply(response)

    return;
    
		console.log(`Message from ${message.author.tag} in #${message.channel.name} : ${message.content}`);

      var { userQuizDict } = require('./../commands/quiz');
      
      var user = message.author.tag;
      const quizDict = userQuizDict[user]
      if(typeof quizDict === 'undefined'){
          message.reply('get Quiz First!!');
          return;
      }
      var animal = quizDict['animal']
      var answer = message.content;


      var { userScoreDict } = require('./../functions/score');
      var user = message.author.tag;
      const scoreDict = userScoreDict[user]
      if(typeof scoreDict === 'undefined'){
          userScoreDict[user] = 0
      }
      if(answer.toLowerCase().includes(animal)){
        message.react('⭕');
        userScoreDict[user] += 10;
        message.reply('you get a 10 point. Total Point is ' + userScoreDict[user])
      }else{
        message.react('❌');
      }
	},
};



  