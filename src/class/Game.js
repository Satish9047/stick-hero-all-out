class Game {
    constructor() {
        // creating the state of the game
        const state = {
            isWaiting: false,
            isStretching: false,
            isTurning: false,
            isWalking: false,
            isTransitioning: false,
            isFalling: false
        };

        // platform
        this.platforms = [];

        // Set the first platform to be at 1/3 of the canvas width
        const firstPlatformX = 300;
        const firstPlatform = new Platform(firstPlatformX, canvasHeight - 200);
        this.platforms.push(firstPlatform);

        // Set the ninja's x-coordinate to be on the first platform
        let heroX = firstPlatformX + (firstPlatform.platformWidth - HERO_WIDTH) / 2;
        let heroY = canvasHeight - (PLATFORM_HEIGHT + HERO_HEIGHT);
        this.ninja = new Hero(heroX, heroY, HERO_WIDTH, HERO_HEIGHT, HERO_COLOR);

        // Generate additional platforms in random positions
        for (let i = 2; i < 5; i++) {
            const platformX = i * this.getRandomPlatformX(); // for getting random x-axis
            const platform = new Platform(platformX, canvasHeight - 200);
            this.platforms.push(platform);
        }

        // stick
        let stickX = this.ninja.x + this.ninja.heroWidth-STICK_WIDTH
        let stickY = this.ninja.y + this.ninja.heroHeight

        this.stick = new Stick( stickX, stickY);

        // controller
        this.controller = new Controller();
        this.controller.mouseDown();
        this.controller.mouseUp();
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
        //if mouse clicked
        if(this.controller.stickStretch){
            this.stick.update()
        }
        this.stick.x = this.ninja.x + this.ninja.heroWidth- STICK_WIDTH;
        this.draw();
    }


    // to get the x axis
    getRandomPlatformX() {
        return getRandomNumber(350, 400);
    }
}
