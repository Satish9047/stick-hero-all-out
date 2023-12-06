//detection between ninja and platform
function collisionDetection(ninja, platform1){
    if(ninja.x < platform1.x + platform1.platformWidth &&
        ninja.x + ninja.heroWidth > platform1.x &&
        ninja.y < platform1.y + platform1.platformHeight &&
        ninja.y + ninja.heroHeight > platform1.platformHeight){
        playGame.ninja.y = canvasHeight-platform1.height;
    }
}



//get random number
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}