//creating the Hero Class

class Hero{
    constructor(x, y, heroWidth, heroHeight, color, heroImg) {
        this.x = x
        this.y = y;
        this.heroWidth = heroWidth
        this.heroHeight = heroHeight
        this.heroImg = heroImg
        this.heroLife = 3
        this.color = color
    }

    //updates
    update(platforms){

        for(const platform of platforms){
            // Check for collision with each platform
            for (const platform of platforms) {
                if (
                    this.x + this.heroWidth >= platform.x &&
                this.x < platform.x + platform.platformWidth
                ) {
                    // Align the hero's right side with the platform's right side
                    this.x = this.x + platform.platformWidth
                }
            }

            // Update other logic as needed
            // For example, you can add code to handle other movements

            // Example: Increment x to move the hero to the right
            this.x++;
        }
        this.x++
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

