

function collisionDetection(ninja, platform) {
    //console.log(" from collision detection",ninja.x <= platform.x + platform.platformWidth, ninja.x + ninja.heroWidth >= platform.x, ninja.y <= platform.y + platform.platformHeight, ninja.y + ninja.heroHeight >= platform.y )
    return (
        ninja.x < platform.x + platform.width &&
        ninja.x + ninja.width > platform.x &&
        ninja.y < platform.y + platform.height &&
        ninja.y + ninja.height >= platform.y
        );
}

//get random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function collisionDetectionWithStick(ninja, stick) {

    return (
        ninja.x < stick.x + stick.height &&
        ninja.x + ninja.width < stick.x + stick.height &&
        ninja.x + ninja.width > stick.x &&
        ninja.y < stick.y + stick.width &&
        ninja.y + ninja.height >= stick.y
        );
}
