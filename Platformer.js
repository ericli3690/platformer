console.log('Platformer');

//defining the canvas and the pen
var game = document.getElementById('game');
var ctx = game.getContext('2d');

//making the game fit the window
var width = window.innerWidth;
var height = window.innerHeight;
game.width = width;
game.height = height;

//what colour the pen is, the font
ctx.fillStyle = 'black';
ctx.font = "15px Arial";

//when loading images
function loadImages(mySrc, x, y, ctxi, firstTimeLoading) {
  var imageToDraw = new Image();
  imageToDraw.src = mySrc;
  if (firstTimeLoading == true) {
    imageToDraw.onload = function() {
      ctxi.drawImage(imageToDraw, x, y);
    }
  } else {
    ctxi.drawImage(imageToDraw, x, y);
  }
}

//character
//looks, position variables
var characterImage = './images/imagges.png';
var characterX = 0;
var characterY = 0;
//drawing the character
function drawCharacter(first) {
  ctx.clearRect(0, 0, width, height)
  loadImages(characterImage, characterX, characterY, ctx, first);
}
//first time drawing the character
drawCharacter(true);

//keydown variables
var aDown = false;
var dDown = false;

//keydown
function keyDown(event) {
  if (event.keyCode == 65) {
    //a
    aDown = true;
  }
  if (event.keyCode == 68) {
    //d
    dDown = true;
  }
}

function keyUp(event) {
  if (event.keyCode == 65) {
    //a
    aDown = false;
  }
  if (event.keyCode == 68) {
    //d
    dDown = false;
  }
}

function whileDown() {
  if ((aDown || dDown) == true) {
    if (aDown == true && characterX > 0) {
      characterX -= 2;
    }
    if (dDown == true && characterX < width - 50) {
      characterX += 2;
    }
    drawCharacter(false);
  }
}

setInterval(whileDown, 1);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
