class Platform{
    constructor(x, y) {
        this.x = x
        this.y= y
        this.width = getRandomNumber(50, 110) //gets random width platform
        this.height = PLATFORM_HEIGHT
        this.color = "black"
    }
    update(){

    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

