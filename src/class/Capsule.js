// capsule.js
class Capsule {
  constructor(x, y, radius, capsuleType) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = capsuleType;
    this.collisionDetected = false;
  }

  draw() {
    let capsuleColor;
    //selecting color according to the capsule type
    switch (this.type) {
      case "score":
        capsuleColor = "blue";
        break;
      case "jump":
        capsuleColor = "red";
        break;
      case "fly":
        capsuleColor = "green";
        break;
      case "life":
        capsuleColor = "purple";
        break;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = capsuleColor;
    ctx.fill();
    ctx.strokeStyle = capsuleColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  update(stick) {
    // Check if collision with stick
    const isColliding = checkCollision(stick, this);

    // Check if collision is detected
    if (stick && isColliding && !this.collisionDetected) {
      console.log("collision detected");

      //to avoid continuous detection
      this.collisionDetected = true;

      switch (this.type) {
        case "score":
          playGame.score += 5;
          break;
        case "jump":
          // Calculate trajectory for the jump
          const jumpTrajectory = calculateJumpTrajectory(
            this.x,
            this.y,
            this.radius,
            this.type,
            playGame.currentPlatform.x + playGame.currentPlatform.width,
            playGame.currentPlatform.y
          );

          // Set ninja's jump trajectory
          playGame.ninja.setJumpTrajectory(jumpTrajectory);
          break;

          break;
        case "fly":
          break;
        case "life":
          
        if(playGame.ninja.life < 3){
          playGame.ninja.life += 1;
        }
          

          break;

        default:
          break;
      }
    }

    // Update collision detection flag based on current collision status
    this.collisionDetected = isColliding;
  }
}

function calculateJumpTrajectory(capsuleX, capsuleY, capsuleRadius, capsuleType, targetX, targetY) {
  // Implement your trajectory calculation logic here
  // For example, you can use a quadratic Bezier curve or any other method

  // For simplicity, let's assume a linear trajectory for demonstration
  const startX = capsuleX;
  const startY = capsuleY;
  const endX = targetX;
  const endY = targetY;

  return { startX, startY, endX, endY };
}
