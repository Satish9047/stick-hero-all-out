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

        

        // Check collision with platforms
        for (const platform of platforms) {
            //console.log(collisionDetection(playGame.ninja, platform))
            if (collisionDetection(playGame.ninja, platform)) {
                this.y = platform.y - this.heroHeight;
                VELOCITY = 0;
            }
        }

        // Check collision with the stick
        if (collisionDetectionWithStick(playGame.ninja, stick)) {
            this.y = stick.y - this.heroHeight;
            VELOCITY = 0;
        }


        //fall condition
        for (const platform of platforms) {
            //console.log(playGame.currentState)
            if (this.y + this.heroHeight > platform.y) {
                VELOCITY += GRAVITY;
                this.y += VELOCITY;
                this.x += 0;
            }
        }


        // Update hero's position based on the game state
        switch (playGame.currentState) {
            case GameState.WAITING:
            case GameState.STRETCHING:
            case GameState.TURNING:
//                for (const platform of platforms) {
//                    if (this.x + this.heroWidth >= platform.x + platform.platformWidth) {
//                        this.x = platform.x + platform.platformWidth - this.heroWidth;
//                        VELOCITY = 0;
//                    }
//                }
                break;

            case GameState.WALKING:

                this.x += HERO_SPEED;
                break;

            default:
                this.x += HERO_SPEED;
        }


        this.y += VELOCITY;
        this.x += HERO_SPEED;
    }

    // Draw the hero on the canvas
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.heroWidth, this.heroHeight);
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
