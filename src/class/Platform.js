class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = getRandomNumber(70, 110); //gets random width platform
    this.height = PLATFORM_HEIGHT;
    this.color = "black";
  }
  //update
  update() {
    //change the width of the platform according to the level
    if (playGame.currentLevel === 2) {
      this.width = getRandomNumber(65, 95);
    }
    if (playGame.currentLevel === 3) {
      this.width = getRandomNumber(65, 80);
    }
    if (playGame.currentLevel === 4) {
      this.width = getRandomNumber(60, 75);
    }
    this.draw();
  }

  //platform draw function
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
