// Creating the Hero Class
class Hero {
  constructor(x, y, heroWidth, heroHeight) {
    this.x = x;
    this.y = y;
    this.width = heroWidth;
    this.height = heroHeight;
    this.heroLife = 3;
    this.image = new Image();
    this.image.src = "./src/img/ninjaorange1.png";
    this.life = 3;
  }

  // Update method
  update(platforms, stick, currentPlatform) {
    // Apply gravity when falling
    VELOCITY += GRAVITY;

    // Check collision with platforms
    for (const platform of platforms) {
      //console.log(collisionDetection(playGame.ninja, platform))
      if (collisionDetection(playGame.ninja, platform)) {
        if (this.y + this.height > platform.y) {
          this.fall();
        } else {
          this.y = platform.y - this.height;
          VELOCITY = 0;
        }
      }
    }

    // Check collision with the stick
    if (collisionDetectionWithStick(playGame.ninja, stick)) {
      this.y = stick.y - this.height;
      VELOCITY = 0;
    }

    //fall condition
    for (const platform of platforms) {
      //console.log(playGame.currentState)
      if (this.y + this.height > platform.y) {
        VELOCITY += GRAVITY;
        this.y += VELOCITY;
        this.x += 0;
      }
    }

    //Update hero's position based on the game state
    switch (playGame.currentState) {
      case GameState.WAITING:
        if (!currentPlatform) break;
        this.x =
          currentPlatform.x + currentPlatform.width - this.width - stick.width;
        VELOCITY = 0;
        break;
      case GameState.STRETCHING:
        //console.log(stick);
        this.x += 0;
        stick?.update();
        break;
      case GameState.TURNING:
        stick?.rotate();
        if (stick?.rotation === 90) {
          const nextPlatformIndex =
            getCurrPlatformIndex(playGame.ninja, platforms) + 1;
          const nextPlatform = platforms[nextPlatformIndex];
          // console.log("hello", nextPlatform);
          const isLandingSuccessful =
            stick &&
            stick.rotation === 90 &&
            stick.x + stick.height >= nextPlatform.x &&
            stick.x + stick.height <= nextPlatform.x + nextPlatform.width;

          if (isLandingSuccessful) {
            stickLandedAudio.play();
            playGame.score++; // Increase the score
            console.log(playGame.score);
          }
        }
        break;

      case GameState.WALKING:
        this.walk();
        break;

      default:
      //this.x += HERO_SPEED;
    }
    this.y += VELOCITY;
    // this.x += HERO_SPEED;
  }

  // Draw the hero on the canvas
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  walk() {
    //ninjaRunAudio.play();
    this.x += HERO_SPEED;
  }
  fall() {
    fallAudio.play();
    this.y += VELOCITY;
  }

  respawn(nextPlatform) {
    console.log(nextPlatform);
    this.y = nextPlatform.y - this.height;
    this.x = nextPlatform.x + nextPlatform.width - this.width - playGame.stick.width;
    VELOCITY = 0;
  }
}
