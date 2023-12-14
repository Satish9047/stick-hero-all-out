
/**
 * Detects collision between a ninja and a platform.
 * 
 * @param {object} ninja ninja properties
 * @param {object} platform platform properties
 * @returns {boolean} if collision detected true nor false
 */
function collisionDetection(ninja, platform) {
    //console.log(" from collision detection",ninja.x <= platform.x + platform.platformWidth, ninja.x + ninja.heroWidth >= platform.x, ninja.y <= platform.y + platform.platformHeight, ninja.y + ninja.heroHeight >= platform.y )
    return (
        ninja.x < platform.x + platform.width &&
        ninja.x + ninja.width > platform.x &&
        ninja.y < platform.y + platform.height &&
        ninja.y + ninja.height >= platform.y
        );
}


/**
 * Get random number between minimum and maximum number
 * 
 * @param {number} min minimum number
 * @param {number} max maximum number
 * @returns {number} random intiger between min and max
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


/**
 * Detects collision between a ninja and a stick.
 * 
 * @param {object} ninja ninja properties
 * @param {object} stick stick properties
 * @returns {boolean} if collision detected true nor false
 */
function collisionDetectionWithStick(ninja, stick) {
    if(!stick) return false
    return (
        ninja.x < stick.x + stick.height &&
        ninja.x + ninja.width < stick.x + stick.height &&
        ninja.x + ninja.width > stick.x &&
        ninja.y < stick.y + stick.width &&
        ninja.y + ninja.height >= stick.y
        );
}
