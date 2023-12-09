//detection between ninja and platform
function collisionDetection(ninja, platform) {
    return (
        ninja.x < platform.x + platform.platformWidth &&
        ninja.x + ninja.heroWidth > platform.x &&
        ninja.y < platform.y + platform.platformHeight &&
        ninja.y + ninja.heroHeight > platform.y
        );
}

//get random number
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}