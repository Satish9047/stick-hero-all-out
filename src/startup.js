//const menuSection = document.querySelector(".menu");
const playBtn = document.querySelector(".play-btn");
const gameSection = document.querySelector(".game-section");
const rePlaySection = document.querySelector(".re-play-section");
const playSection = document.querySelector(".play-section");
const rePlayBtn = document.querySelector(".re-play-btn");
const yourScore = document.getElementById("your-score");
const highestScoreElement = document.getElementById("highest-score");
const highestScoreReplay = document.getElementById("highest-score-replay");

//default styles
canvas.style.display = "none";
rePlaySection.style.display = "none";

//play button
playBtn.addEventListener("click", () => {
  playGame.hasGameStarted = true;
  console.log("click triggired");
  playSection.style.display = "none";
  canvas.style.display = "block";
});

//replay button
rePlayBtn.addEventListener("click", () => {
  console.log("replay clicked");
  playGame.hasGameStarted = true;
  canvas.style.display = "block";
  rePlaySection.style.display = "none";
  location.reload();
});
