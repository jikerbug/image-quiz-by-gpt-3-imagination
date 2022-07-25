
var animalList = ['lion', 'peacock', 'giraffe', 'chicken', 'elephant', 'deer', 'turtle',
                  'whale', 'penguin', 'shark', 'wolf', 'crocodile', 'cat', 'dog', 'fish',
                  'sheep', 'horse', 'bear', 'goat', 'zebra', 'dolphin', 'fox', 
                  'parrot', 'rabbit', 'frog', 'swan', 'flamingo'
                  ]
var styleList = ['pictogram', 'triangular geometrical', 'doodle', 'abstract', 
                  '8bit pixel art', 'shadow', 'alien', 'cyberpunk robot', 'stained glass', 
                  'felt art', 'keith haring', 'lego', 'mysterious haunted'
                ]
var objectList = ['car', 'kettle', 'earring', 'shadow', 'teapot', 'papercraft', 'ring', 'necklace',
                  'bottle', 'wallet', 'cap'
                  ]
var specialList = ['without effort', 'vector image']
var scribbledList = ['chalk', 'pencil', 'crayon']

 
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = function randomQuiz(){
  var description;
  var quiz;
  var animal = animalList[getRandomInt(animalList.length)];
  switch(getRandomInt(3)) {
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

  quiz = description.replace(animal, "X")

  quizDict = {"description": description, "quiz":quiz, "animal":animal, "retry":0}

  return quizDict;

}

