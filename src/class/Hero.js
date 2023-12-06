//creating the Hero Class

class Hero{
    constructor(x, y, heroWidth, heroHeight, color, heroImg) {
        this.x = x
        this.y = y
        this.heroWidth = heroWidth
        this.heroHeight = heroHeight
        this.heroImg = heroImg
        this.heroLife = 3
        this.color = color
    }

    //updates
    update(){
        this.y++
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.heroWidth, this.heroHeight);
    }

    //walk ability
    walk(){
        
    }
    
    //jump ability
    jump(){
        
    }
    
    //fly ability
    fly(){
        
    }
    
    //your life
    life(){
        
    }
}

