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
  draw(target, first) {
    loadImage(sprite, x, y, target.ctx, first);
  }
}

class Canvas {
  constructor(identity) {
    this.identity = identity;
  }
  ready() {
    this.ctx = identity.getContext('2d');
    this.identity.width = width;
    this.identity.height = height;
    this.interval = setInterval(this.update(), 20);
  }
  clear() {
    this.ctx.clearRect(0, 0, width, height);
  }
  update() {
    this.clear();
    player.newPos();
    player.draw(this.identity, false);
  }
}

//first time drawing the character
var characterImages = ['./images/imagges.png'];
var characterStartingX = 50;
var characterStartingY = 250;

var player = new Player(characterStartingX, characterStartingY, characterImages[0]);
var canvas = new Canvas(document.getElementById('game'));
canvas.ready();
player.draw(canvas, true);

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


//gravity

var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 80, 75);
    myGameArea.start();
}
//making another canvas? Need to link this to previous canvas
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
// all gravity and speed, i think this is good
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
