//creating the Hero Class

class Hero {
    constructor(x, y, heroWidth, heroHeight, color, heroImg) {
        this.x = x
        this.y = y;
        this.heroWidth = heroWidth
        this.heroHeight = heroHeight
        this.heroImg = heroImg
        this.heroLife = 3
        this.color = color
        this.image = new Image();
        this.image.src = "./src/img/ninjaorange1.png"
    }


    //updates

    update(platforms) {
        // Apply gravity when falling
        VELOCITY += GRAVITY;
        this.y += VELOCITY;

        for (const platform of platforms) {
            if (collisionDetection(playGame.ninja, platform)) {
                // Check collision with the platform
                this.y = platform.y - this.heroHeight; // Adjust y-coordinate to be on the platform

//                if (playGame.currentState === GameState.FALLING) {
                    // Change the state to walking when colliding with a platform
                    playGame.currentState = GameState.WALKING;
//                }
            }
        }

        if (playGame.currentState === GameState.WALKING) {
            // Check if the hero's right side aligns with the platform's right side
            for (const platform of platforms) {
                if (this.x + this.heroWidth >= platform.x + platform.platformWidth) {
                    // Align the hero's right side with the platform's right side
                    this.x = platform.x + platform.platformWidth - this.heroWidth;
                    VELOCITY = 0;
                    playGame.currentState = GameState.WAITING; // Change state to WAITING
                    console.log(playGame.currentState, "2nd")
                }
            }
        }

        this.x += HERO_SPEED;
    }


    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.heroWidth, this.heroHeight);
    }

    moveTONextPlatform(stick, platform) {

    }


    //build stick
    increaseStickHeight() {

    }

//walk ability
    walk() {
        if (GameState.currentState === GameState.WALKING) {
            // Update the hero's position for walking
            this.x += HERO_SPEED;
        }
    }

    //jump ability
    jump() {

    }

    //fly ability
    fly() {

    }

    //your life
    life() {

    }
}

