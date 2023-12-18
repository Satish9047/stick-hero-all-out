const menuSection = document.querySelector(".menu");
const playBtn = document.querySelector(".play-btn");
const gameSection = document.querySelector(".game-section");

canvas.style.display ="none";

playBtn.addEventListener("click", ()=>{
    playGame.hasGameStarted = true;
    console.log("click triggired");
    menuSection.style.display = "none";
    canvas.style.display = "block";
})

const higestScore = document.getElementById("Highest-score");



