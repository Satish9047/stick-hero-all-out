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

        this.currentPlatform = null
        // game state
        this.currentState = GameState.WALKING;
        console.log(this.currentState, "1st")

        // platform
        this.platforms = [];

        // Generate platforms with random spacing and width using a loop
        let prevX = canvasWidth / 4;
        for (let i = 0; i < 4; i++) {
            const platformWidth = getRandomNumber(50, 110);
            const platform = new Platform(prevX, canvasHeight - 200, platformWidth);
            this.platforms.push(platform);
            prevX += platformWidth + getRandomNumber(50, 250);
        }

        // Instance of Hero
        let heroX = this.platforms[0].x + (this.platforms[0].platformWidth - HERO_WIDTH) / 2;
        let heroY = canvasHeight - (PLATFORM_HEIGHT + HERO_HEIGHT);
        this.ninja = new Hero(heroX, heroY, HERO_WIDTH, HERO_HEIGHT, HERO_COLOR);

        // stick
        let stickX = this.ninja.x
        let stickY = this.ninja.y + this.ninja.heroHeight
        this.stick = new Stick(stickX, stickY);

        // controller
        this.controller = new Controller();
    }

    draw() {
        this.ninja.draw();
        this.platforms.forEach((platform) => {
            platform.draw();
        });
        this.stick.draw();
    }

    run() {
        this.ninja.update(this.platforms, this.stick);


        //stop the hero
        if (this.currentPlatform && this.ninja.x + this.ninja.heroWidth > this.currentPlatform.x + this.currentPlatform.platformWidth) {
            console.log(this.currentPlatform && this.ninja.x + this.ninja.heroWidth > this.currentPlatform.x + this.currentPlatform.platformWidth, "is detecting platform")
            this.currentState = GameState.WAITING;
            this.ninja.x = this.currentPlatform.x + this.currentPlatform.platformWidth - this.ninja.heroWidth;
            VELOCITY = 0;
        }

         //move
        if (this.stick.rotation === 90 && this.ninja.x < this.stick.x + this.stick.stickHeight) {
            this.currentState = GameState.WALKING;
            this.ninja.x += HERO_SPEED;
        }


        this.currentPlatform = this.getCurrentPlatform();
        //console.log(this.currentPlatform, "is the platform that hero is in!")
        //if mouse clicked the stick height increased
        if (this.controller.stickStretch) {
            this.currentState = GameState.STRETCHING;
            this.stick.update();
        }

        //when the mouse up triggered
        if (this.controller.release) {
            this.currentState = GameState.TURNING;
            this.stick.rotate();
            if (this.stick.rotation >= 90) {
                this.currentState = GameState.WALKING;
//                this.ninja.moveTONextPlatform(this.platforms);
                this.ninja.walk();
            }
        }

        if (this.controller.stickStretch) {
            this.stick.x = this.ninja.x + this.ninja.heroWidth - STICK_WIDTH;
        }

        if (this.stick.rotation === 90) {
//            this.ninja.walk()
        }

        if (this.ninja.y > canvasHeight) {
            this.restartGame()
        }



        this.draw();
    }

    getCurrentPlatform() {
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i];
            if (
                this.ninja.y + this.ninja.heroHeight >= platform.y &&
                this.ninja.y <= platform.y + platform.platformHeight &&
                this.ninja.x >= platform.x &&
                this.ninja.x + this.ninja.heroWidth <= platform.x + platform.platformWidth
            ) {
                //console.log(`Hero is on Platform ${i + 1}`);
                return platform;
            }
        }

        console.log("Hero is not on any platform");
        return null;
    }


    restartGame() {
//        console.log("restartGame")
    }
}





