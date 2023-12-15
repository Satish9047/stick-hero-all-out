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
    this.score = 0;
    this.higestScore = window.localStorage.getItem("higestScore") || 0;

    this.currentPlatform = null;
    // game state
    this.currentState = GameState.WALKING;
    //console.log(this.currentState, "1st")

    // platform
    this.platforms = [];
    this.stickArry = [];
    this.stick = null;

    // Generate platforms with random spacing and width using a loop
    let prevX = canvasWidth / 4;
    for (let i = 0; i < 8; i++) {
      const platformWidth = getRandomNumber(50, 110);
      const platform = new Platform(prevX, canvasHeight - 200, platformWidth);
      this.platforms.push(platform);
      prevX += platformWidth + getRandomNumber(50, 250);

      const stickX = platform.x + platform.width - STICK_WIDTH;
      const stickY = platform.y;
      const stick = new Stick(stickX, stickY);
      this.stickArry.push(stick);
    }

    // Instance of Hero
    let heroX =
      this.platforms[0].x + (this.platforms[0].width - HERO_WIDTH) / 2;
    let heroY = canvasHeight - (PLATFORM_HEIGHT + HERO_HEIGHT);
    this.ninja = new Hero(heroX, heroY, HERO_WIDTH, HERO_HEIGHT, HERO_COLOR);


    // controller
    this.controller = new Controller();
  }

  draw() {
    this.ninja.draw();
    this.platforms.forEach((platform) => {
      platform.draw();
    });
    this.stick?.draw();
  }

  run() {
    const currPlatformIndex = this.getCurrPlatformIndex();
    //console.log(currPlatformIndex, "current platform index")
    if (currPlatformIndex !== -1) {
      this.stick = this.stickArry[currPlatformIndex];
      this.currentPlatform = this.platforms[currPlatformIndex];
    }
    this.ninja.update(this.platforms, this.stick, this.currentPlatform);

    // Check for successful landing and collision with the next platform
    if (
      this.currentState === GameState.WALKING &&
      this.ninja.x + this.ninja.width >
        this.currentPlatform.x + this.currentPlatform.width
    ) {
      // Stick successfully landed on the next platform
      const nextPlatformIndex = (currPlatformIndex + 1) % this.platforms.length; // Assuming a circular arrangement of platforms

      const nextPlatform = this.platforms[nextPlatformIndex];
      const isLandingSuccessful =
        this.stick &&
        this.stick.rotation === 90 &&
        this.stick.x >= nextPlatform.x &&
        this.stick.x + this.stick.height <= nextPlatform.x + nextPlatform.width;

      if (isLandingSuccessful) {
        this.score++; // Increase the score
        console.log(this.score);
      } else {
        this.restartGame;
      }

      // Reset game state after landing
      this.currentState = GameState.WAITING;
    }

    //sliding the view
    if (this.ninja.x > 500) {
      this.platforms.forEach((platform) => {
        platform.x -= HERO_SPEED;
      });

      this.stickArry.forEach((stick) => {
        stick.x -= HERO_SPEED;
      });
    }

    if(this.currentPlatform === GameState.WALKING){
      
    }

  

    //stop the hero
    if (
      this.currentState === GameState.WALKING &&
      this.ninja.x + this.ninja.width >
        this.currentPlatform.x + this.currentPlatform.width
    ) {
      this.currentState = GameState.WAITING;
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
    }

    if (this.score > this.higestScore) {
      window.localStorage.setItem("higestScore", this.score);
    }

    if (this.ninja.y > canvasHeight) {
        console.log("restart the game")
      //this.restartGame();
    }

    this.draw();
  }


  /**
   * Get Current Platform
   *
   * @returns {index} returns the index of the platform that ninja is in
   */
  getCurrPlatformIndex() {
    for (let i = 0; i < this.platforms.length; i++) {
      const platform = this.platforms[i];
      if (
        this.ninja.y + this.ninja.height >= platform.y &&
        this.ninja.y <= platform.y + platform.height &&
        this.ninja.x >= platform.x &&
        this.ninja.x + this.ninja.width <= platform.x + platform.width
      ) {
        //console.log(`Hero is on Platform ${i + 1}`);
        return i;
      }
    }
    //console.log("Hero is not on any platform");
    return -1;
  }
}
