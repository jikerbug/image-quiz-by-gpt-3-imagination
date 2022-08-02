
const {getImagination} = require('./getText');
const {animalDict} = require('../emojis.json');


let animalList = []
for (let x in animalDict) {
  animalList.push(animalDict[x])
}

animalList = new Set(animalList);
animalList = [...animalList];


const styleList = ['pictogram', 'triangular geometrical', 'doodle', 'abstract',
                  '8bit pixel art', 'alien', 'cyberpunk robot', 'stained glass', 'pop art', 'van gogh', 'Art Nouveau posters',
                  'felt art', 'keith haring', 'lego', 'rectangular geometrical', 'line geometrical', 'ancient Egyptian statues'
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

