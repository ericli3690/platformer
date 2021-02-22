console.log('Platformer');

//defining the canvas and the pen
var game = document.getElementById('game');
var ctx = game.getContext('2d');

//making the game fit the window
game.width = window.innerWidth;
game.height = window.innerHeight;

//what colour the pen is, the font
ctx.fillStyle = 'black';
ctx.font = "15px Arial";

//testing
ctx.fillText('Hello World', 50, 50);
