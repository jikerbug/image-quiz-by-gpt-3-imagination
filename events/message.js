

module.exports = {
	name: 'messageCreate',
	async execute(message) {
    if (message.author.bot || !(message.content.endsWith("?") || message.content.includes('!')) )
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


      if(answer.toLowerCase().includes(animal)){
        message.react('⭕');
      }else{
        message.react('❌');
      }
	},
};



  