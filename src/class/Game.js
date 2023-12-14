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

        //score
        this.score = 0;
        this.highScore = window.localStorage.getItem("HigestScore") || 0;

        //hero's position state
        this.currentPlatform = null

        // game state
        this.currentState = GameState.WALKING;
        console.log(this.currentState, "1st")

        // platform
        this.platforms = [];
        this.stickArry = [];

        // Generate platforms with random spacing and width using a loop
        let prevX = canvasWidth / 4;
        for (let i = 0; i < 4; i++) {
            const platformWidth = getRandomNumber(50, 110);
            const platform = new Platform(prevX, canvasHeight - 200, platformWidth);
            this.platforms.push(platform);

            //generating stick on every platform
            const stickX = platform.x + platform.width - STICK_WIDTH;
            const stickY = platform.y;
            const stick = new Stick(stickX, stickY);
            this.stickArry.push(stick);

            prevX += platformWidth + getRandomNumber(70, 250);
        }


        // Instance of Hero
        let heroX = this.platforms[0].x + (this.platforms[0].width - HERO_WIDTH) / 2;
        let heroY = canvasHeight - (PLATFORM_HEIGHT + HERO_HEIGHT);
        this.ninja = new Hero(heroX, heroY, HERO_WIDTH, HERO_HEIGHT);


        //this.stick = new Stick(stickX, stickY);
        this.stick = null

        // controller
        this.controller = new Controller();
    }

    draw() {
        this.ninja.draw();
        this.platforms.forEach((platform) => {
            platform.draw();
        });
        this.stick?.draw();
    }

    run() {

        const currentPlatformIndex = this.getCurrentPlatformIndex();
//      console.log(this.currentState, "the current state");


        if (currentPlatformIndex !== -1) {
            //console.log("changing active stick")
            this.stick = this.stickArry[currentPlatformIndex];
            // this.stick = this.stickArry[0];
        }

        this.stick && this.currentPlatform && this.ninja.update(this.platforms, this.stick, this.currentPlatform);
        //stop the hero
        // stop the hero when aligned with the platform's right side
        if (
            this.currentPlatform && this.ninja.x + this.ninja.width > this.currentPlatform.x + this.currentPlatform.width
        ) {
            this.currentState = GameState.WAITING;
            console.log(this.currentState);
            this.ninja.x = this.currentPlatform.x + this.currentPlatform.width - this.ninja.width;
            VELOCITY = 0;
        }


        //console.log(currentPlatformIndex)
        //move until the height of the stick
        if (this.stick && this.stick.rotation === 90 && this.ninja.x < this.stick.x + this.stick.height) {
            this.currentState = GameState.WALKING;
            this.ninja.x += HERO_SPEED;
        }

        this.currentPlatform = this.getCurrentPlatform();
        //console.log(currentPlatformIndex);


        //if mouse clicked the stick height increased
        if (this.controller.stickStretch && this.currentPlatform) {
            this.currentState = GameState.STRETCHING;
            this.stick.height = this.ninja.y - this.currentPlatform.y;
            this.stick.update();
        }

        //when the mouse up triggered
        if (this.controller.release) {
            this.currentState = GameState.TURNING;
            this.stick?.rotate();

            if (this.stick?.rotation >= 90) {
                this.currentState = GameState.WALKING;
                this.ninja.walk();
            }
        }


        if (this.controller.stickStretch) {
            this.stick.x = this.ninja.x + this.ninja.width - STICK_WIDTH;
        }


        if (this.stick?.rotation === 90) {
            this.ninja.walk()
        }

        //saving the higest score
        if (this.score > this.highScore) {
            window.localStorage.setItem("Highest Score", this.score)
        }

        //Restart
        if (this.ninja.y > canvasHeight) {
            this.restartGame()
        }
        this.draw();
    }

    getCurrentPlatform() {
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i];
            if (
                this.ninja.y + this.ninja.height >= platform.y &&
                this.ninja.y <= platform.y + platform.height &&
                this.ninja.x >= platform.x &&
                this.ninja.x + this.ninja.width <= platform.x + platform.width
            ) {
                //console.log(`Hero is on Platform ${i + 1}`);
                return platform;
            }
        }
        //console.log("Hero is not on any platform");
        return null;
    }


//to get the hero's current platform index
    getCurrentPlatformIndex() {
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i];
            if (
                this.ninja.y + this.ninja.height >= platform.y &&
                this.ninja.y <= platform.y + platform.height &&
                this.ninja.x >= platform.x &&
                this.ninja.x + this.ninja.width <= platform.x + platform.width
            ) {
                //console.log(`Hero is in index ${i} of platform, from game.js`);
                return i;
            }
        }
        //console.log("Hero is not on any platform");
        return -1;
    }


    restartGame() {
//        console.log("restartGame")
    }
}





