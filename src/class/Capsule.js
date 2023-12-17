// capsule.js
class Capsule {
  constructor(x, y, radius, capsuleColor, capsuleType) {
    this.x = x
    this.y = y
    this.radius = radius
    this.type = capsuleType
    this.collisionDetected = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  update(stick) {
    // Check if collision with stick
    const isColliding = checkCollision(stick, this);

    // Check if collision is detected for the first time
    if (stick && isColliding && !this.collisionDetected) {
      console.log("collision detected");
      playGame.score += 5; // Access the game instance to update the score
      this.collisionDetected = true; // Set the flag to true to avoid continuous detection
    }

    // Update collision detection flag based on current collision status
    this.collisionDetected = isColliding;
  }
}
