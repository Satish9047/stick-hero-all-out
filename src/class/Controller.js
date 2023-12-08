class Controller{
    constructor() {
        this.stickStretch = false;

    }
    
    mouseDown(){
        window.addEventListener("mousedown",(event)=>{
            //console.log("mouse down event triggered", event.clientX, event.clientY);
            this.stickStretch = true;
            //console.log(this.stickStretch, "Mouse Down is triggred from controller");
        })
    }
    
    mouseUp(){
        window.addEventListener("mouseup", (event)=>{
//            console.log("mouse down event triggered", event.clientX, event.clientY);
            this.stickStretch = false;
        })
    }
}