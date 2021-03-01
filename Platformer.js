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
  }
  get pos() {
    return this.x + ' ' + this.y;
  }
  newPos() {

  }
}

class Canvas {
  constructor(identity) {
    this.identity = identity;
  }
  ready() {
    this.ctx = this.identity.getContext('2d');
    this.identity.width = width;
    this.identity.height = height;
    this.interval = setInterval(this.update(), 20);
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
  update() {
    this.clear();
    player.newPos();
    player.draw(this.identity, false);
  }
}

function updateCanvas(target, action) {
  target.clear();

}

//first time drawing the character
var characterImages = ['./images/imagges.png'];
var characterStartingX = 50;
var characterStartingY = 235;
var player;
var playerCanvas;

//canvases
function startGame() {
  playerCanvas = new Canvas(document.getElementById('player'));
  backgroundCanvas = new Canvas(document.getElementById('background'));
  foregroundCanvas = new Canvas(document.getElementById('foreground'));
  //player canvas
  player = new Player(characterStartingX, characterStartingY, characterImages[0]);
  playerCanvas.ready();
  player.draw(playerCanvas, true);
}

//startGame();

//keydown variables
var aDown = false;
var dDown = false;
var background = 2;
var backgrounds = ['./images/title_screen.png', './images/instructions_screen.png', './images/brain_background.png', './images/dream_background.png'];
function backgroundSet() {
  document.body.style.backgroundImage = "url(" + backgrounds[background].toString() + ")";
  document.body.style.backgroundSize = '1368px 920px';
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
  if (event.keyCode == 69) {
    //e, toggle background
    if (background == 2) {
      background = 3;
    } else if (background == 3) {
      background = 2;
    }
    backgroundSet();
  }
  if (background == 0 || background == 1) {
    background += 1;
    backgroundSet();
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

//character speed
function whileDown() {
  if ((aDown || dDown) == true) {
    if (aDown == true && player.x > 0) {
      player.x -= 0.5;
    }
    if (dDown == true && player.x < width - player.sprite.width) {
      player.x += 1;
    }
  }
}

setInterval(whileDown, 1);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


// all gravity and speed, i think this is good
/*
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
}
this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }
  this.hitBottom = function() {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
    }
  }
*/
