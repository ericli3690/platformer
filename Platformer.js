console.log('JS Linked');

//when loading images
function loadImage(mySrc, x, y, ctxi, firstTimeLoading) {
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

class Player {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = characterImages[sprite];
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = -0.5;
    this.height = 112;
    this.width = 75;
  }
  get pos() {
    return this.x + ' ' + this.y;
  }
  newPos() {
    this.velocityY += this.gravity;
    this.x += this.velocityX;
    this.y -= this.velocityY;
    this.hitBottom();
  }
  hitBottom() {
    //var rockBottom = window.innerHeight - player.height - playerCanvas.bottom;
    var rockBottom = window.innerHeight - player.height;
    if (this.y > rockBottom) {
      this.y = rockBottom;
      this.velocityY = 0;
    }
  }
}

class Canvas {
  constructor(identity, bottom) {
    this.identity = identity;
    this.bottom = bottom;
  }
  set() {
    this.ctx = this.identity.getContext('2d');
    this.identity.width = window.innerWidth;
    this.identity.height = window.innerHeight;
  }
  start() {
    this.interval = setInterval(updatePlayer, 20);
  }
  stop() {
    clearInterval(this.interval);
  }
  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  drawImg(img, x, y, first) {
    loadImage(img, x, y, this.ctx, first)
  }
}

function updatePlayer() {
  playerCanvas.clear();
  player.newPos();
  playerCanvas.drawImg(player.sprite, player.x, player.y, false);
}

//first time drawing the character
var characterImages = ['./images/imagges.png'];
var characterStartingX = 50;
var characterStartingY = 235;
var player;
var playerCanvas;

//canvases
function startGame() {
  playerCanvas = new Canvas(document.getElementById('player'), 270);
  backgroundCanvas = new Canvas(document.getElementById('background'), 0);
  foregroundCanvas = new Canvas(document.getElementById('foreground'), 0);
  //player canvas
  player = new Player(characterStartingX, characterStartingY, 0);
  playerCanvas.set();
  playerCanvas.drawImg(player.sprite, player.x, player.y, true);
  playerCanvas.start();
}

startGame();

//keydown variables
var aDown = false;
var dDown = false;
var spaceDown = false;
var background = 0;
var backgrounds = ['./images/F11_background.png', './images/title_screen.png', './images/instructions_screen.png', './images/brain_background.png', './images/dream_background.png'];
function backgroundSet() {
  document.body.style.backgroundImage = "url(" + backgrounds[background].toString() + ")";
  document.body.style.backgroundSize = '1368px 912px';
}
var waitUntilBrowserUpdates;
function canvasSet() {
  document.getElementById('player').width = window.innerWidth;
  document.getElementById('player').height = window.innerHeight;
  clearInterval(waitUntilBrowserUpdates);
}

backgroundSet();

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
  if (event.keyCode == 32) {
    //space
    spaceDown = true;
  }
  if (event.keyCode == 69) {
    //e, toggle background
    if (background == 2) {
      background = 3;
    } else if (background == 3) {
      background = 2;
    }
    backgroundSet();
  }
  if (event.keyCode == 27) {
    //esc
    if (background == 1 || background == 2) {
      background += 1;
      backgroundSet();
    }
  }
  if (event.keyCode == 122) {
    //f11
    if (background == 0) {
     background += 1;
     backgroundSet();
     waitUntilBrowserUpdates = setInterval(canvasSet, 250);
    }
  }
}


function keyUp(event) {
  if (event.keyCode == 65) {
    //a
    aDown = false;
    player.velocityX = 0;
  }
  if (event.keyCode == 68) {
    //d
    dDown = false;
    player.velocityX = 0;
  }
  if (event.keyCode == 32){
    //space
    spaceDown = false;
 }
}
//character speed and jump
function whileDown() {
  if (aDown == true && player.x > 0) {
    player.velocityX -= 1;
  }
  if (dDown == true && player.x < window.innerWidth - player.width) {
    player.velocityX += 1;
  }
  if (spaceDown == true) {

  }
}

setInterval(whileDown, 16);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
