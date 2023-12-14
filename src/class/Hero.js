// Creating the Hero Class
class Hero {
    constructor(x, y, heroWidth, heroHeight) {
        this.x = x;
        this.y = y;
        this.width = heroWidth;
        this.height = heroHeight;
        this.image = new Image();
        this.image.src = "./src/img/ninjaorange1.png";
    }

    // Update method
    update(platforms, stick, currentPlatform) {
        // Apply gravity when falling
        VELOCITY += GRAVITY;
        
        // Check collision with platforms
        for (const platform of platforms) {
            //console.log(collisionDetection(playGame.ninja, platform))
            if (collisionDetection(playGame.ninja, platform)) {
                this.y = platform.y - this.height;
                VELOCITY = 0;
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

        this.y += VELOCITY;
        this.x += HERO_SPEED;
    }

    // Draw the hero on the canvas
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }


    moveTONextPlatform(stick, platform) {

    }

    increaseStickHeight() {

    }

    walk() {
        if (GameState.currentState === GameState.WALKING) {
            this.x += HERO_SPEED;
        }
    }

    jump() {

    }

    fly() {

    }

    life() {

    }
}
