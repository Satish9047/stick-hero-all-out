//const menuSection = document.querySelector(".menu");
const playBtn = document.querySelector(".play-btn");
const gameSection = document.querySelector(".game-section");
const rePlaySection = document.querySelector(".re-play-section")
const playSection = document.querySelector(".play-section")
const rePlayBtn = document.querySelector(".re-play-btn")
const yourScore = document.getElementById("your-score")
const higestScore = document.getElementById("highest-score");
const higestScoreRePlay = document.getElementById("highest-score-replay");

canvas.style.display ="none";
rePlaySection.style.display = "none";

playBtn.addEventListener("click", ()=>{
    playGame.hasGameStarted = true;
    console.log("click triggired");
    playSection.style.display = "none";
    canvas.style.display = "block";
})

rePlayBtn.addEventListener("click",()=>{
    console.log("replay clicked")
    playGame.hasGameStarted = true;
    canvas.style.display ="block";
    rePlaySection.style.display = "none";
})




