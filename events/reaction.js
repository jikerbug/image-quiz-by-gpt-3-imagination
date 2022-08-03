const { animalDict } = require('../emojis.json');

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user) {
        if(user.bot){
            return;
        }
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }
    
        // Now the message has been cached and is fully available
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);

        const emoji = reaction.emoji.name;
        if(emoji == '❌' ||emoji == '💩' ||emoji == '☠️' || emoji == '⭕'){
          return;
        }else if(emoji =='👍' || emoji == '❤️' || emoji == '♥️'){
          return;
        }

        user = user.tag
        console.log(emoji);
        var { userQuizDict } = require('./../commands/quiz');
        const quizDict = userQuizDict[user]
        if(typeof quizDict === 'undefined'){
            reaction.message.reply('get new Quiz First!!');
            return;
        } 

        
        if(emoji == '❓' || emoji == '❔'){
          reaction.message.react(quizDict['emoji']);
          delete userQuizDict[user];
          return;
        }
        const animal = quizDict['animal']
        const userAnswer = animalDict[emoji];
        if(typeof userAnswer === 'undefined'){
            reaction.message.reply('this emoji is not in animal quiz list');
            return;
        }
        var { userScoreDict } = require('./../functions/score');
        const scoreDict = userScoreDict[user]
        if(typeof scoreDict === 'undefined'){
            userScoreDict[user] = 0
        }
        if(userAnswer == animal){
          reaction.message.react('⭕');
          reaction.message.react(emoji);
          userScoreDict[user] += 10;
          reaction.message.reply(user+ ' get a 10 point. Total Point is ' + userScoreDict[user]);
          delete userQuizDict[user];
        }else{
          let failCnt =  quizDict["failCnt"];
          if(failCnt == 0){
            reaction.message.react('❌');
            quizDict["failCnt"] += 1;
          }else if(failCnt == 1){
            reaction.message.react('💩');
            quizDict["failCnt"] += 1;
          }else{
            reaction.message.react('☠️');
            reaction.message.react(quizDict['emoji']);
            delete userQuizDict[user];
          }
        }
    },
};


