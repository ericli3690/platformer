console.log('Ta-Da!');

//defining the canvas and the pen
var body = document.body;
var game = document.getElementById('game');
var ctx = game.getContext('2d');
//what colour the pen is, the font
ctx.fillStyle = 'black';
ctx.font = "15px Arial";
//drawing
ctx.fillRect(50, 50, 100, 100);
ctx.fillText('hi', 50, 50);

var canvas = document.getElementById("game");
var ctx = game.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

function resizeCanvas() {
  game.width = window.innerWidth;
  game.height = window.innerHeight;
  body.width = window.innerwidth;
  body.height = window.innerHeight;
}
