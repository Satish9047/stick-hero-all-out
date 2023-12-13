//stick
class Stick {
    constructor(x, y) {
        this.x = x
        this.y = y;
        this.stickWidth = STICK_WIDTH;
        this.stickHeight = 0; // Set initial height to 0
        this.rotation = 0;
    }

    draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((Math.PI / 180) * this.rotation);
            ctx.fillStyle = "black";
            ctx.fillRect(0, -this.stickHeight, this.stickWidth, this.stickHeight);
            ctx.restore();
    }

    update() {
            this.stickHeight += STRETCH_SPEED;
    }

    rotate() {
        if (this.rotation < 90) {
            this.rotation += ROTATION_SPEED;
        }
        if(this.rotation === 90){
            playGame.currentState = GameState.WALKING;
        }
    }
}