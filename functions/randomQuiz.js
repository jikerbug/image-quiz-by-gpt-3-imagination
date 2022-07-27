
var animalList = ['lion', 'elephant', 'deer',
                   'penguin', 'shark', 'cat',
                  'sheep', 'bear', 'goat', 'dolphin', 'fox', 'rabbit', 'swan'
                  ]
var styleList = ['pictogram', 'triangular geometrical', 'doodle', 'abstract', 
                  '8bit pixel art', 'alien', 'cyberpunk robot', 'stained glass', 
                  'felt art', 'keith haring', 'lego', 'rectangular geometrical', 'line geometrical',
                ]
var objectList = ['car', 'kettle', 'earring', 'teapot', 'papercraft', 'ring', 'necklace',
                  'bottle'
                  ]

// var objectList = [ 'earring', 'ring', 'necklace']
var specialOptionList = ['vector image', 'Adobe Illustration Sticker Svg', 'made of gold', 'oil on canvas', 'made of silver'
, 'scribbled with chalk', 'scribbled with pencil'
  ]


var userQuizDict = {

};

 
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = function randomQuiz(mode){
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

  quiz = description.replace(animal, "X")

  quizDict = {"description": description, "quiz":quiz, "animal":animal, "retry":0}

  return quizDict;

}

