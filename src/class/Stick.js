class Stick {
    constructor(x, y, stickWidth, stickHeight) {
        this.x = x;
        this.y = y;
        this.stickWidth = stickWidth;
        this.stickHeight = 0; // Set initial height to 0
        this.controller = new Controller();
        this.controller.stickStretch = false;
    }

    draw() {
        ctx.fillRect(this.x, this.y - this.stickHeight, this.stickWidth, this.stickHeight);// Adjust y-coordinate to account for the height
    }

    update() {
        if (this.controller.stickStretch) {
            this.stickHeight += STRETCH_SPEED;
        }
    }
}
