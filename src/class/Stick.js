//stick
class Stick {
    constructor(x, y) {
        this.x = x
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
        if(this.rotation === 90){
            
            playGame.currentState = GameState.WALKING;
        }

        if (
            this.currentState === GameState.WALKING &&
            this.currentPlatform &&
            this.ninja.x + this.ninja.width > this.currentPlatform.x + this.currentPlatform.width
        ) {
            // Stick successfully landed on the next platform
            const nextPlatformIndex = currPlatformIndex + 1;
            const nextPlatform = this.platforms[nextPlatformIndex];
            const isLandingSuccessful =
                this.stick &&
                this.stick.rotation === 90 &&
                this.stick.x + this.stick.height >= nextPlatform.x &&
                this.stick.x + this.stick.height <= nextPlatform.x + nextPlatform.width;
        
            if (isLandingSuccessful) {
                this.score++; // Increase the score
                console.log(this.score);
            }
        
        }
    }
    update() {
        stickStretchAudio.play()
        stickStretchAudio.playbackRate = 1;
        this.height += STRETCH_SPEED;

        
    }
}

