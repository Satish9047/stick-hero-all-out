class Controller{
    constructor() {
        this.stickStretch = false;
        this.release = false;
        console.log(this.release);

        this.mouseDown();
        this.mouseUp();
//        this.touch()
    }
    
    mouseDown(){
        window.addEventListener("mousedown",(event)=>{
            //console.log("mouse down event triggered", event.clientX, event.clientY);
            console.log(playGame.currentState, "show we the current state")
            if (playGame.currentState === GameState.WAITING) {
                this.stickStretch = true;
            }
//            this.stickStretch = true;
            //console.log(this.stickStretch, "Mouse Down is triggred from controller");

        })
    }
    
    mouseUp(){
        window.addEventListener("mouseup", (event)=>{
//            console.log("mouse down event triggered", event.clientX, event.clientY);
            this.stickStretch = false;
            this.release = true;
            console.log(this.release, "triggered release when the mouse is up")
        })
    }

//    touch(){
//        window.addEventListener("touchstart", ()=>{
//
//            this.stickStretch = false;
//            this.release = true;
//            console.log(this.release, "triggered release when the mouse is up")
//        })
//    }
}