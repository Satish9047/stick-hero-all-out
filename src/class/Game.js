//creating game class for centralizing the animation and games
class Game{
    constructor() {
        this.ninja = new Hero(0, 0, 50, 50, "red");
        this.platforms = [];

        //get random number
        const randomNumber = getRandomNumber(200, canvasHeight);

        //generating platforms in random position
        for( let i = 0; i < 3; i++){
            const platformX = i * randomNumber; //for getting random spacing between 3 platform
            const platform = new Platform(platformX,canvasHeight-100, 100);
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
        this.draw();
        this.ninja.update();
    }
}


