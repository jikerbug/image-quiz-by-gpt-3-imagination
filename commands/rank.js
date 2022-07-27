var test = `
Animal Quiz Score Leaderboard

Ranking
🥇 - tinywhale#9914 - 212,100
🥈 - Isak#9745 - 196,050
🥉 - doheun#0064 - 117,300
🏅 - YangJungHyo#3228 - 106,650
🏅 - DHBaek#6937 - 104,250
🏅 - htom#4928 - 92,550
🏅 - 잘될놈#6340 - 91,050
🏅 - ohie#4199 - 88,800
🏅 - JDLEE#0639 - 81,300
🏅 - Dein0mite#9219 - 80,250
🏅 - KLAYDICE - AngryB (G)#6353 - 80,250
🏅 - hyun#2710 - 77,400
🏅 - KoiDreamer.eth#0001 - 77,100
🏅 - yangssi#3871 - 71,400
🏅 - YEOP#4255 - 70,800
🏅 - Jonasz#7369 - 65,550
🏅 - bindos#9079 - 62,400
🏅 - Nupe#5400 - 58,650
🏅 - choidonghyeon#0929 - 58,3
`

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Replies with rank leader board of quiz')
                                    ,
  async execute(interaction) {
        const embed = new MessageEmbed()
            .setDescription(test)
            .setColor("#5104DB")
            .setTimestamp();
        interaction.followUp({embeds: [embed]});
  },
};




