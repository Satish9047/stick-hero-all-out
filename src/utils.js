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
  if (!stick) return false;
  return (
    ninja.x < stick.x + stick.height &&
    ninja.x + ninja.width < stick.x + stick.height &&
    ninja.x + ninja.width > stick.x &&
    ninja.y < stick.y + stick.width &&
    ninja.y + ninja.height >= stick.y
  );
}

/**
 * collision detection between stick and the capsule when rotating
 *
 * @param {object} stick get stick properties
 * @param {object} capsule get capsule properties
 * @returns boolean
 */
// Check for collision between stick and capsule
function checkCollision(stick, capsule) {
  // Find the closest point on the stick's rotated rectangle to the capsule's center
  let stickTopLeftX = stick.x;
  let stickTopLeftY = stick.y - stick.height;
  let stickBottomRightX = stick.x + stick.width;
  let stickBottomRightY = stick.y;

  // Rotate the capsule point back to the stick's coordinate
  let rotatedCapsuleX =
    Math.cos((Math.PI / 180) * -stick.rotation) * (capsule.x - stick.x) -
    Math.sin((Math.PI / 180) * -stick.rotation) * (capsule.y - stick.y) +
    stick.x;
  let rotatedCapsuleY =
    Math.sin((Math.PI / 180) * -stick.rotation) * (capsule.x - stick.x) +
    Math.cos((Math.PI / 180) * -stick.rotation) * (capsule.y - stick.y) +
    stick.y;

  // Finding the closest point on the stick's rectangle to the rotated capsule point
  let closestX = Math.max(
    stickTopLeftX,
    Math.min(rotatedCapsuleX, stickBottomRightX)
  );
  let closestY = Math.max(
    stickTopLeftY,
    Math.min(rotatedCapsuleY, stickBottomRightY)
  );

  // Calculate the distance between the closest point and the rotated capsule point
  let distanceX = rotatedCapsuleX - closestX;
  let distanceY = rotatedCapsuleY - closestY;
  let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Check if the distance is less than or equal to the sum of the capsule's radius and half of the stick's width
  return distance <= capsule.radius + stick.width / 2;
}

/**
 * Get Current Platform Index
 *
 * @param {object} ninja ninja properties
 * @param {array} platforms array of platform properties
 * @returns {number} index of the platform that ninja is on, or -1 if not on any platform
 */
function getCurrPlatformIndex(ninja, platforms) {
  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    if (
      ninja.y + ninja.height >= platform.y &&
      ninja.y <= platform.y + platform.height &&
      ninja.x >= platform.x &&
      ninja.x + ninja.width <= platform.x + platform.width
    ) {
      return i;
    }
  }
  return -1;
}
