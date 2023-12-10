class Controller {
    constructor() {
        this.stickStretch = false;
        this.release = false;
//        console.log(this.release);

        this.mouseDown();
        this.mouseUp();
//        this.touch()
    }

    mouseDown() {
        window.addEventListener("mousedown", (event) => {
            if (playGame.currentState === GameState.WAITING) {
                //console.log("mouse down event triggered", event.clientX, event.clientY);
                this.stickStretch = true;
                playGame.currentState = GameState.STRETCHING;
                console.log(playGame.currentState, "3rd");
            }
        })
    }


    mouseUp() {
        window.addEventListener("mouseup", (event) => {
            this.stickStretch = false;
            this.release = true;
            playGame.currentState = GameState.TURNING;
            console.log(playGame.currentState, "4th")
        })
    }

}