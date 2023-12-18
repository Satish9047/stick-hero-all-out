//stick
class Stick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = STICK_WIDTH;
    this.height = 0; // Set initial height to 0
    this.rotation = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.fillStyle = "black";
    ctx.fillRect(0, -this.height, this.width, this.height);
    ctx.restore();
  }

  rotate() {
    if (this.rotation < 90) {
      this.rotation += ROTATION_SPEED;
    }
    if (this.rotation === 90) {
      playGame.currentState = GameState.WALKING;
    }
  }

  update() {
    if (this.y - this.height <= 5) {
      this.height += 0;
      console.log("stop");
    } else {
      stickStretchAudio.play();
      stickStretchAudio.playbackRate = 1;
      if (playGame.currentLevel === 2) {
        this.height += STRETCH_SPEED + 2;
      } else if (playGame.currentLevel === 3) {
        this.height += STRETCH_SPEED + 3;
      } else if (playGame.currentLevel === 4) {
        this.height += STRETCH_SPEED + 5;
      } else {
        this.height += STRETCH_SPEED;
      }
    }
  }
}
