class Platform{
    constructor(x, y) {
        this.x = x
        this.y= y
        this.platformWidth = getRandomNumber(50, 120) //gets random width platform
        this.platformHeight = PLATFORM_HEIGHT
        this.color = "black"
    }
    update(){

    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.platformWidth, this.platformHeight);
    }
}

