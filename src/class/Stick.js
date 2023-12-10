//stick
class Stick {
    constructor(hero) {
        this.hero = hero;
        this.stickWidth = STICK_WIDTH;
        this.stickHeight = 0; // Set initial height to 0
        this.rotation = 0;
        this.isStickAttached = true;

    }

    draw() {
        ctx.save();
        ctx.translate(this.hero.x + this.hero.heroWidth-STICK_WIDTH, this.hero.y + this.hero.heroHeight);
        ctx.rotate((Math.PI / 180) * this.rotation);
        ctx.fillStyle = "black";
        ctx.fillRect(0, -this.stickHeight, this.stickWidth, this.stickHeight);
        ctx.restore();
    }

    update() {
        if (this.isStickAttached) {
            this.stickHeight += STRETCH_SPEED;
        }
    }

    rotate() {
        if (this.rotation < 90) {
            this.rotation += ROTATION_SPEED;
        }
        if(this.rotation === 90){
            this.isStickAttached = false;
            playGame.currentState = GameState.WALKING;
            console.log("is the stick attached?", this.isStickAttached);
        }
    }

    setPositionRelativeToPlatform(platforms){
        const platform = platforms.find(platform => this.hero.x >= platform.x && this.hero.x <= platform.x + platform.platformWidth);
        if (platform) {
            this.x = platform.x + platform.platformWidth / 2 - STICK_WIDTH / 2;
            this.y = platform.y;
        }
    }
}