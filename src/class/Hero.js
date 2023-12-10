// Creating the Hero Class
class Hero {
    constructor(x, y, heroWidth, heroHeight, color, heroImg) {
        this.x = x;
        this.y = y;
        this.heroWidth = heroWidth;
        this.heroHeight = heroHeight;
        this.heroImg = heroImg;
        this.heroLife = 3;
        this.color = color;
        this.image = new Image();
        this.image.src = "./src/img/ninjaorange1.png";
    }

    // Update method
    update(platforms, stick) {
        // Apply gravity when falling
        VELOCITY += GRAVITY;
        this.y += VELOCITY;

        // Check collision with platforms
        for (const platform of platforms) {
            if (collisionDetection(playGame.ninja, platform)) {
                // Adjust hero's position to be on top of the platform
                this.y = platform.y - this.heroHeight;
            }
        }
        console.log("collision detected with stick", collisionDetection(playGame.ninja, stick))
        // Check collision with the stick
        if (collisionDetection(playGame.ninja, stick)) {
            this.y = stick.y - this.heroHeight;
        }

        // Update hero's position based on the game state
        switch (playGame.currentState) {
            case GameState.WAITING:
            case GameState.STRETCHING:
            case GameState.TURNING:
            case GameState.TRANSITIONING:
                this.adjustToPlatform(platforms);
                break;

            case GameState.WALKING:
                // Check if the hero is on top of the stick
                this.adjustToStick(stick);
                break;

            default:
                this.x += HERO_SPEED;
        }

        this.x += HERO_SPEED; // Move the hero horizontally
    }

    // Draw the hero on the canvas
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.heroWidth, this.heroHeight);
    }

    // Method to adjust hero's position to be on top of the stick
    adjustToStick(stick) {
        if (this.y + this.heroHeight >= stick.y && this.x + this.heroWidth >= stick.x && this.x <= stick.x + stick.stickWidth) {
            this.y = stick.y - this.heroHeight;
        } else {
            this.x += HERO_SPEED;
        }
    }

    // Method to align hero's right side with the right side of the platform
    adjustToPlatform(platforms) {
        for (const platform of platforms) {
            if (this.x + this.heroWidth >= platform.x + platform.platformWidth) {
                // Align the hero's right side with the platform's right side
                this.x = platform.x + platform.platformWidth - this.heroWidth;
                VELOCITY = 0; // Stop vertical movement
            }
        }
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
