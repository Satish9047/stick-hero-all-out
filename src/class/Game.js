//creating game class for centralizing the animation and games
class Game{
    constructor() {

        //creating the state of th game
        const state = {
            isWaiting: false,
            isStretching: false,
            isTurning: false,
            isWalking: false,
            isTransitioning: false,
            isFalling: false
        }

        //fixing the y co-ordinate for the ninja
        let heroY = canvasHeight-(PLATFORM_HEIGHT + HERO_HEIGHT);


        this.ninja = new Hero(0, heroY, HERO_WIDTH, HERO_HEIGHT, HERO_COLOR);
        this.platforms = [];

        //get random number
        const randomNumber = getRandomNumber(200, canvasHeight);
        //generating platforms in random position
        for( let i = 0; i < 3; i++){
            const platformX = i * randomNumber; //for getting random spacing between 3 platform
            const platform = new Platform(platformX,canvasHeight-200, 100);
            this.platforms.push(platform);
        }
    }

    draw(){
        this.ninja.draw()
        this.platforms.forEach((platform) => {
            platform.draw();
        });
    }

    run(){
        this.ninja.update(this.platforms);
        this.draw();
    }
}




