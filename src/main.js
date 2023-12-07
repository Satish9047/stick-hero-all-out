// Referencing the canvas in an variable
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//saving the canvas width and height in an variable;
let canvasWidth = canvas.width;
let canvasHeight=canvas.height;

//creating instance of the Game
const playGame = new Game();

//animation loop
function animate(){
    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    playGame.run();

}

animate()







