function collisionDetection(ninja, platform) {
    //console.log(ninja.x <= platform.x + platform.platformWidth, ninja.x + ninja.heroWidth >= platform.x, ninja.y <= platform.y + platform.platformHeight, ninja.y + ninja.heroHeight >= platform.y )
    return (
        ninja.x <= platform.x + platform.platformWidth &&
        ninja.x + ninja.heroWidth >= platform.x &&
        ninja.y <= platform.y + platform.platformHeight &&
        ninja.y + ninja.heroHeight >= platform.y
        );
}

//get random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function collisionDetectionWithStick(ninja, stick) {

    return (
        ninja.x <= stick.x + stick.stickHeight &&
        ninja.x + ninja.heroWidth >= stick.x &&
        ninja.y <= stick.y + stick.stickWidth &&
        ninja.y + ninja.heroHeight >= stick.y
        );
}
