class Stick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.stickWidth = STICK_WIDTH;
        this.stickHeight = 0; // Set initial height to 0
//        this.controller = new Controller();
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y - this.stickHeight, this.stickWidth, this.stickHeight);
       // console.log(this.stickHeight, "this is the stick height from Stick");
    }

    update() {
//        console.log(this.controller.stickStretch);
//        if (this.controller.stickStretch) {
            this.stickHeight += STRETCH_SPEED;
//        }
    }
}
