const canvas = document.getElementById("canvas");
const menuSection = document.querySelector(".menu");
const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", ()=>{
    menuSection.style.display = "none";
    canvas.style.display = "block";
})