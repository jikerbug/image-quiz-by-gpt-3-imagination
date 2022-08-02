
const { getTalk } = require('../functions/getText')

module.exports = {
	name: 'messageCreate',
	async execute(message) {

    const content = message.content
    if(message.author.bot || message.author.system || content == '')
      return;

    
    var response = await getTalk(content);
    if(response.replaceAll(' ', '') == '' || response.replaceAll('\n', '') == ''){
      response = '.'
    }
    message.reply(response)

    return;
    
	},
};

  