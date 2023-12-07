class Controller{
    constructor() {
        this.stickStretch = false;
    }
    
    mouseDown(){
        window.addEventListener("mousedown",(event)=>{
            console.log("mouse down event triggered", event.clientX, event.clientY);
            this.stickStretch = true;
            console.log(this.stickStretch);
        })
    }
    
    mouseUp(){
        window.addEventListener("mouseup", (event)=>{
            console.log("mouse up event triggered");
            this.stickStretch = false;
        })
    }
}