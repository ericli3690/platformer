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

//testing
ctx.fillText('Hello World', 50, 50);

//character
var characterX = 500;
var characterY = 500;
function drawCharacter() {
  ctx.clearRect(0, 0, width, height)
  ctx.fillRect(characterX, characterY, 50, 50);
}

drawCharacter();

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
  if (aDown == true && characterX > 0) {
    characterX -= 1;
  }
  if (dDown == true && characterX < width - 50) {
    characterX += 1;
  }
  drawCharacter();
}

setInterval(whileDown, 5);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
