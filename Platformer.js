console.log('JS Linked');

//making the game fit the window
var width = window.innerWidth;
var height = window.innerHeight;

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
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.height = 112;
    this.width = 75;
  }
  get pos() {
    return this.x + ' ' + this.y;
  }
  newPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }
  hitBottom() {
    var rockBottom = height - player.height - playerCanvas.bottom;
    if (this.y > rockBottom) {
      this.y = rockBottom;
      this.gravitySpeed = 0;
      jumpCooldown = false;
      console.log('smack')
    }
  }
  accelerate(n) {
    player.gravity = n;
  }
}

class Canvas {
  constructor(identity, bottom) {
    this.identity = identity;
    this.bottom = bottom;
  }
  set() {
    this.ctx = this.identity.getContext('2d');
    this.identity.width = width;
    this.identity.height = height;
  }
  start() {
    this.interval = setInterval(updatePlayer, 20);
  }
  stop() {
    clearInterval(this.interval);
  }
  clear() {
    this.ctx.clearRect(0, 0, width, height);
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
var backgrounds = ['./images/title_screen.png', './images/instructions_screen.png', './images/brain_background.png', './images/dream_background.png'];
function backgroundSet() {
  document.body.style.backgroundImage = "url(" + backgrounds[background].toString() + ")";
  document.body.style.backgroundSize = '1368px 920px';
}

backgroundSet();

var jumpCooldown = false;;

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
    if (jumpCooldown == false) {
      player.accelerate(-1);
    }
    console.log('jump')
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
    if (background == 1 || background == 2) {
      background += 1;
      backgroundSet();
    }
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
  if (event.keyCode == 32){
  //space
  spaceDown = false;
  player.gravity = 1;
  timeSinceJump = 0;
  jumpCooldown = true;
  console.log('spaceoff')
 }
}
//character speed and jump
var timeSinceJump = 0;

function whileDown() {
  if ((aDown || dDown || spaceDown) == true) {
    if (aDown == true && player.x > 0) {
      player.x -= 1;
    }
    if (dDown == true && player.x < width - player.width) {
      player.x += 1;
    }
    if (spaceDown == true) {
      timeSinceJump += 1;
      if (timeSinceJump == 50) {
        player.gravity = 1;
        timeSinceJump = 0;
        jumpCooldown = true;
        console.log('timeup');
      }
    }
  }
}

setInterval(whileDown, 10);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
