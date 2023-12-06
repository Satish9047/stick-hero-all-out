class Controller{
    constructor() {
        this.stickStretch = false;
    }
    
    mouseDown(){
        window.addEventListener("mousedown",(event)=>{
            console.log("mouse down event triggered")
        })
    }
    
    mouseUp(){
        window.addEventListener("mouseup", ()=>{
            console.log("mouse up event triggered")
        })
    }
    
    
}