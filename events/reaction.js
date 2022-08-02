const {animalDict} = require('../emojis.json');

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

        user = user.tag
        console.log(reaction.emoji.name);
        var { userQuizDict } = require('./../commands/quiz');
        const quizDict = userQuizDict[user]
        if(typeof quizDict === 'undefined'){
            reaction.message.reply('get Qussiz First!!');
            return;
        } 

        var animal = quizDict['animal']
        var answer = animalDict[reaction.emoji.name];
        if(typeof answer === 'undefined'){
            reaction.message.reply('error input');
            return;
        }
        var { userScoreDict } = require('./../functions/score');
        const scoreDict = userScoreDict[user]
        if(typeof scoreDict === 'undefined'){
            userScoreDict[user] = 0
        }
        if(answer == animal){
          reaction.message.react('⭕');
          reaction.message.react(reaction.emoji.name);
          userScoreDict[user] += 10;
          reaction.message.reply(user+ ' get a 10 point. Total Point is ' + userScoreDict[user])
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
            reaction.message.reply("answer was : " + animal);
            delete userQuizDict[user];
          }
        }
    },
};


