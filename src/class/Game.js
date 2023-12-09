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
        // game state
        // state = ["waiting", "stretching", "turning", "walking", "transitioning", "falling"]
        this.currentState = GameState.WAITING;

        // platform
        this.platforms = [];


            // Set the first platform to be at 1/4 of the canvas width
            const firstPlatformX = canvasWidth / 4;
            const firstPlatform = new Platform(firstPlatformX, canvasHeight - 200);
            this.platforms.push(firstPlatform);

            // Generate additional platforms with random spacing and width
            let prevX = firstPlatformX + firstPlatform.platformWidth + getRandomNumber(50, 250);

            for (let i = 1; i < 3; i++) {
                const platformX = prevX + getRandomNumber(50, 250);
                const platformWidth = getRandomNumber(50, 110);

                const platform = new Platform(platformX, canvasHeight - 200, platformWidth);
                this.platforms.push(platform);

                prevX = platformX + platformWidth;
            }


        // Instance of Hero
        // Set the ninja's x-coordinate to be on the first platform
        let heroX = firstPlatformX + (firstPlatform.platformWidth - HERO_WIDTH) / 2;
        let heroY = canvasHeight - (PLATFORM_HEIGHT + HERO_HEIGHT);
        this.ninja = new Hero(100, 200, HERO_WIDTH, HERO_HEIGHT, HERO_COLOR);

        // stick
        let stickX = this.ninja.x + this.ninja.heroWidth-STICK_WIDTH
        let stickY = this.ninja.y + this.ninja.heroHeight
        this.stick = new Stick( stickX, stickY);


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
        this.ninja.update(this.platforms);
        //if mouse clicked the stick height increased
        if (this.controller.stickStretch) {
            this.currentState = GameState.STRETCHING;
            this.stick.update();
        }

        //when the mouse up triggered
        if (this.controller.release) {
            this.currentState = GameState.TURNING;
//            console.log(this.currentState, "from the turning")
            this.stick.rotate();
        if (this.stick.rotation >= 90) {
            this.currentState = GameState.WALKING;
//                console.log(this.currentState);
            this.ninja.moveTONextPlatform(this.platforms);
//                this.stick.rotation = 0;
            this.ninja.walk();

            }
        }

        if (this.controller.stickStretch) {
            this.stick.x = this.ninja.x + this.ninja.heroWidth - STICK_WIDTH;
        }

        this.draw();
    }

    // to get the x axis
    getRandomPlatformX() {
        return getRandomNumber(350, 400);
    }
}




