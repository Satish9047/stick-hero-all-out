const GameState = {
  WAITING: "waiting",
  STRETCHING: "stretching",
  TURNING: "turning",
  WALKING: "walking",
  TRANSITIONING: "transitioning",
  FALLING: "falling",
};

class Game {
  constructor() {
    this.hasGameStarted = false;
    this.score = 0;

    this.highestScore = window.localStorage.getItem("highestScore") || 0;
    highestScoreElement.append(this.highestScore);

    highestScoreReplay.append(this.highestScore);
    // higestScoreRePlay.append(this.higestScore);

    this.currentLevel = 1;

    this.currentPlatform = null;

    // game state
    this.currentState = GameState.WALKING;
    //console.log(this.currentState, "1st")

    // platform
    this.platforms = [];
    this.stickArry = [];
    this.capsuleArry = [];
    this.stick = null;

    this.nextPlatformState = {
      index: 0,
      platform: null,
    };

    // Generate platforms with random spacing and width using a loop
    let prevX = canvasWidth / 4;
    for (let i = 0; i < 8; i++) {
      const platform = new Platform(prevX, canvasHeight - 200);
      this.platforms.push(platform);

      const stickX = platform.x + platform.width - STICK_WIDTH;
      const stickY = platform.y;
      const stick = new Stick(stickX, stickY);
      this.stickArry.push(stick);
      prevX += platform.width + getRandomNumber(100, 480);
    }

    // Instance of Hero
    let heroX =
      this.platforms[0].x + (this.platforms[0].width - HERO_WIDTH) / 2;
    let heroY = canvasHeight - (PLATFORM_HEIGHT + HERO_HEIGHT);
    this.ninja = new Hero(heroX, heroY, HERO_WIDTH, HERO_HEIGHT, HERO_COLOR);

    // controller
    this.controller = new Controller();

    //capsule
    this.capsule = new Capsule(200, 200, 20);
  }

  drawScore() {
    ctx.fillStyle = "#161A30";
    ctx.font = "26px Arial";
    ctx.fillText(`Score: ${this.score}`, canvasWidth - 120, 30);
  }

  drawLife() {
    ctx.fillStyle = "#161A30";
    ctx.font = "26px Arial";
    ctx.fillText(`Life: ${playGame.ninja.life}`, 60, 30);
  }

  draw() {
    this.ninja.draw();
    this.platforms.forEach((platform) => {
      platform.draw();
    });
    this.stick?.draw();
    this.drawScore();
    this.drawLife();

    // Iterate over each capsule and call the draw method
    this.capsuleArry.forEach((capsule) => {
      capsule.draw();
    });
  }

  run() {
    if (!this.hasGameStarted) return;
    const currPlatformIndex = getCurrPlatformIndex(this.ninja, this.platforms);
    //console.log("current state", this.currentState);

    if (currPlatformIndex !== -1) {
      this.currentPlatform = this.platforms[currPlatformIndex];
      const nextPlatformIndex = currPlatformIndex + 1;
      this.nextPlatformState.index = nextPlatformIndex;
      this.nextPlatformState.platform = this.platforms[nextPlatformIndex];
    }

    // Check collision with the stick
    if (!collisionDetectionWithStick(this.ninja, this.stick)) {
      if (currPlatformIndex !== -1) {
        this.stick = this.stickArry[currPlatformIndex];
      }
    }

    //update ninja position
    this.ninja.update(this.platforms, this.stick, this.currentPlatform);

    //sliding the view
    if (this.ninja.x > 400) {
      this.platforms.forEach((platform) => {
        platform.x -= 8;
      });

      this.stickArry.forEach((stick) => {
        stick.x -= 8;
      });

      this.capsuleArry = [];
    }

    // stop the hero
    if (
      this.currentState === GameState.WALKING &&
      this.ninja.x + this.ninja.width >=
        this.currentPlatform.x + this.currentPlatform.width
    ) {
      //console.log(this.stick, this.currentPlatform, this.stick.height < this.currentPlatform.x + this.currentPlatform.width)
      if (
        this.stick.height <
        this.currentPlatform.x + this.currentPlatform.width
      ) {
        this.currentState = GameState.WAITING;
        //console.log("the stick is perfect");
      }
    }

    //if mouse clicked the stick height increased
    if (this.controller.stickStretch) {
      this.currentState = GameState.STRETCHING;
    }

    //when the mouse up triggered
    if (this.currentState === GameState.STRETCHING && this.controller.release) {
      this.currentState = GameState.TURNING;
    }

    //move
    if (
      this.stick &&
      this.stick.rotation === 90 &&
      this.ninja.x < this.stick.x + this.stick.height
    ) {
      this.currentState = GameState.WALKING;
      //console.log("current platform", this.currentPlatform);
    }

    // Remove platforms and sticks that have moved off the left side of the canvas
    this.platforms = this.platforms.filter(
      (platform) => platform.x + platform.width > 0
    );
    this.stickArry = this.stickArry.filter(
      (stick) => stick.x + stick.width > 0
    );

    // Generate new platforms and sticks when the number of existing platforms is less than 6
    while (this.platforms.length < 6) {
      const lastPlatform = this.platforms[this.platforms.length - 1];
      const platformWidth = getRandomNumber(50, 110);
      const newPlatform = new Platform(
        lastPlatform.x + lastPlatform.width + getRandomNumber(70, 250),
        canvasHeight - 200,
        platformWidth
      );
      this.platforms.push(newPlatform);

      const stickX = newPlatform.x + newPlatform.width - STICK_WIDTH;
      const stickY = newPlatform.y;
      const newStick = new Stick(stickX, stickY);
      this.stickArry.push(newStick);
    }

    // Generate capsules
    if (
      this.currentState === GameState.WAITING &&
      this.score % 2 === 0 &&
      this.score !== 0 &&
      this.capsuleArry.length === 0 &&
      this.currentPlatform.x + this.currentPlatform.width ===
        this.ninja.x + this.ninja.width
    ) {
      // Adjust the probability as needed
      const capsuleX = getRandomNumber(canvasWidth / 3, canvasWidth / 1.5);
      const capsuleY = getRandomNumber(canvasHeight - 300, canvasHeight / 2);
      const capsuleRadius = getRandomNumber(12, 35);

      const capsuleTypes = ["jump", "score", "fly", "life"];
      //selecting random capsuletype
      const randomType =
        capsuleTypes[Math.floor(Math.random() * capsuleTypes.length)];

      const newCapsule = new Capsule(
        capsuleX,
        capsuleY,
        capsuleRadius,
        randomType
      );
      this.capsuleArry.push(newCapsule);
    }

    // Iterating over each capsule and call the draw and update methods
    this.capsuleArry.forEach((capsule) => {
      capsule.draw();
      // Passing the stick for collision detection
      capsule.update(this.stick);
    });

    //saving the higest score in the local storage
    if (this.score > this.highestScore) {
      localStorage.setItem("highestScore", this.score);
    }

    //level up controller
    if (this.score > 10) {
      this.currentLevel = 2;
    }

    if (this.score > 20) {
      this.currentLevel = 3;
    }

    if (this.score > 30) {
      this.currentLevel = 4;
    }

    if (this.ninja.y > canvasHeight) {
      this.ninja.fall();
      this.ninja.life--;

      if (this.ninja.life > 0) {
        // Respawn on the next platform
        this.ninja.respawn(this.nextPlatformState.platform);
        //console.log("next platform index", this.nextPlatformState.index);
      } else {
        canvas.style.display = "none";
        rePlaySection.style.display = "block";
        this.hasGameStarted = false;
      }
    }

    //update score
    yourScore.innerHTML = this.score;

    this.draw();
  }
}
