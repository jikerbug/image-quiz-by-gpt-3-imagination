
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
                  'impressionism', 'funk art', 'surreal', 'solarpunk', 'futuristic', 'kandinsky', 'isometric digital art', 'Dalí', '3D',
                ]
const objectList = ['car', 'kettle', 'earring', 'teapot', 'papercraft', 'ring', 'necklace',
                  'bottle'
                  ]

// var objectList = [ 'earring', 'ring', 'necklace']
const specialOptionList = ['vector image', 'Adobe Illustration Sticker Svg', 'made of gold', 'oil on canvas', 'made of silver'
, 'scribbled with chalk', 'scribbled with pencil'
  ]


var userQuizDict = {

};


 
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = async function randomQuiz(mode){
  var description;
  var quiz;
  var animal = animalList[getRandomInt(animalList.length)];
  switch(getRandomInt(2)) {
    case 0: // style
      var style = styleList[getRandomInt(styleList.length)];
      description = animal + ", in " + style + " style"
      break;

    case 1: // object
      var object = objectList[getRandomInt(objectList.length)];
      description = animal + " shaped " + object
      break;

    case 2: // style & object
      var style = styleList[getRandomInt(styleList.length)];
      var object = objectList[getRandomInt(objectList.length)];
      description = animal + " shaped " + object + ", in " + style + " style"
      break
  }

  if(mode == 'hard'){
    var specialOption = specialOptionList[getRandomInt(specialOptionList.length)];
    description += ', ' + specialOption

  } 


  //
  var imagine = await getImagination(animal);
  description = animal + imagine
  if(mode == 'style'){
    description = description + ", in " + styleList[getRandomInt(styleList.length)] + " style"
  }else if(mode == 'drawing'){
    description = "A painting of " + description;
  }
  quiz = description.replaceAll(animal, "X");
  //

  quizDict = {"description": description, "quiz":quiz, "animal":animal, "retry":0, "failCnt":0}

  return quizDict;

}

