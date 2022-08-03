
const {getImagination} = require('./getText');
const {animalDict} = require('../emojis.json');


let animalList = []
for (let x in animalDict) {
  animalList.push(animalDict[x])
}

animalList = new Set(animalList);
animalList = [...animalList];


// `https://docs.google.com/document/d/1j2IAumYz4iZopOTAAOcCUKbFXP0jHK8mRgD4NLFKkaw/edit`
// `
// https://docs.google.com/document/d/17VPu3U2qXthOpt2zWczFvf-AH6z37hxUbvEe1rJTsEc/edit 
// Fun Ad Libs

// The tree of __________ and __________ 
// The temple of __________  and __________ 
// The gateway to __________  and _________
// The angel of _____ and _______
// The emperor/empress of __________

// __________ in the style of a 70s science fiction novel cover
// __________ in the style of a metal album cover
// __________ in the style of cyberpunk noir art deco 
// __________ in the style of glitch art

// biblical fantasy illustration of ______
// an ancient chinese painting of ______
// wildly futuristic clothing with glowing and colorful decoration
// –
// A [size] [type] [creature] made from sticks plastic bits and leaves and colorful threads, concept art
// `
const styleList = ['pictogram', 'triangular geometrical', 'doodle', 'abstract', 'matisse', 'retro', 'dreamlike', 'minimalism',
                  '8bit pixel art', 'alien', 'cyberpunk robot', 'stained glass', 'pop art', 'van gogh', 'Art Nouveau posters',
                  'felt art', 'keith haring', 'lego', 'rectangular geometrical', 'line geometrical', 'ancient Egyptian', 'enamel',
                  'impressionism', 'funk art', 'solarpunk', 'futuristic', 'kandinsky', 'isometric digital art', 'Dalí', '3D',
                  'zentangle', 'Tiffany', 'peacock pattern', 'surrealistic', 'glitch art', '70s science fiction novel cover'
                ]

var userQuizDict = {

};


 
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = async function randomQuiz(mode){
  var description;
  var quiz;
  var animal = animalList[getRandomInt(animalList.length)];
  var imagine = await getImagination(animal);
  description = animal + imagine
  if(mode == 'style'){
    description = description + ", in " + styleList[getRandomInt(styleList.length)] + " style"
  }else if(mode == 'drawing'){
    description = "A painting of " + description;
  }
  quiz = description.toLowerCase().replaceAll(animal, "X");
  //
  const emoji = getKeyByValue(animalDict, animal); // 이렇게 한 이유 : 한 동물에 대한 이모지가 여러개 존재하는 경우가 있기 때문
  quizDict = {"description": description, "quiz":quiz, "animal":animal, "retry":0, "failCnt":0, "emoji": emoji};
  return quizDict;

}

