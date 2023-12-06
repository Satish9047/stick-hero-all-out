
//creating class for platform
class Platform{
    constructor(x, y, platformWidth) {
        this.x = x,
        this.y=y,
        this.platformWidth = platformWidth,
        this.platformHight = 200;
    }
    update(){

    }
    draw(){
        ctx.fillRect(this.x, this.y, this.platformWidth, this.platformHight)
    }
}

const platform1 = new Platform(50, 200, 100)

