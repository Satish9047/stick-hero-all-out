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
        this.image = new Image();
        this.image.src = "./src/img/ninjaorange1.png"
    }

    //updates
    update(platforms){
        for (const platform of platforms) {
            if (
                this.x + this.heroWidth >= platform.x &&
                this.x < platform.x + platform.platformWidth
                ) {
                // Align the hero's right side with the platform's right side
                this.x = platform.x + platform.platformWidth - this.heroWidth;
            }
        }

        this.x++
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.heroWidth, this.heroHeight);
    }

    moveTONextPlatform(){

    }

   //build stick
    increaseStickHeight(){

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

