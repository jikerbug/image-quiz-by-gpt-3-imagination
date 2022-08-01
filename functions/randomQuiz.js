
const {getImagination} = require('./getText')



const animalList = ['lion', 'elephant', 'deer', 'giraffe', 'otter','chipmonk', 'peacock', 'owl', 'wolf', 'frog',
                   'penguin', 'shark', 'cat', 'parrot', 'zebra', 'whale', 'turtle', 'sheep', 'dog', 'chicken', 'crocodile',
                  'sheep', 'bear', 'goat', 'dolphin', 'fox', 'rabbit', 'swan', 'tiger', 'raccoon', 'hedgehog', 'flamingo', 'beaver',
                  'kangaroo', 'buffalo', 'peacock', 'sloth', 'poodle', 'rhino', 'camel'
                  ]
const styleList = ['pictogram', 'triangular geometrical', 'doodle', 'abstract', 'cartoon',
                  '8bit pixel art', 'alien', 'cyberpunk robot', 'stained glass', 'pop art', 'van gogh',
                  'felt art', 'keith haring', 'lego', 'rectangular geometrical', 'line geometrical',
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
  quiz = description.replace(animal, "X");
  //

  quizDict = {"description": description, "quiz":quiz, "animal":animal, "retry":0}

  return quizDict;

}

