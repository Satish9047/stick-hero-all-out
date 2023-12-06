// Referencing the canvas in an variable
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.fillStyle = "red";
ctx.fillRect(10, 10, 10, 10);

