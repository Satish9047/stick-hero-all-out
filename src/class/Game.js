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
        this.currentState = GameState.WAITING;
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
                this.ninja.moveTONextPlatform(this.platforms);
                this.ninja.walk();
            }
        }

        if (this.controller.stickStretch) {
            this.stick.x = this.ninja.x + this.ninja.heroWidth - STICK_WIDTH;
        }

        if (this.stick.rotation === 90) {
//            this.ninja.walk()
        }

        this.draw();
    }
}





