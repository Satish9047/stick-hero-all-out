//creating the class for power capsule

class Capsule{
    constructor(x, y, radius,  capsuleType) {
        this.x =x,
        this.y =y,
        this.radius = radius,
        this.type = capsuleType
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update(){
        
    }

    JumpCapsule(){
        
    }
    
    ScoreCapsule(){
        
    }
    
    LifeCapsule(){
        
    }
    FlyCapsule(){
        
    }
    
}