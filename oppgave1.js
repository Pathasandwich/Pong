
function start() {
    
    const canvas = document.querySelector("canvas");
    const game = document.getElementById("game_container");
    game.style.display = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");

   // Mus
    const mouse = {
    x:canvas.width / 2,
    y:undefined
}
    window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    });

    // stop når spillet er slutt
    const stop = 0;
    
    const Ball = function(x,y,dx,dy,radius,score) {
        // position
        this.x = x;
        this.y = y;
        
        this.dx = dx;
        this.dy = dy;
        
        // ball
        this.radius = radius;

        this.color = "yellow";
        // poeng
        this.score = score;

        // bar
    this.drawRect = function() {
        c.beginPath();
        c.fillStyle = "black";
        c.fillRect(mouse.x,5,200,10);
    }
    
        // sirkel
    this.drawCircle = function() {
        
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        }

        //animtions
    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }
        if(this.y + this.radius > innerHeight - 12 || this.y - this.radius < 0) {
        this.dy = -this.dy;
    }

    // Treff or not
        if(this.y - this.radius < 12 && mouse.x - this.x < 20 && -mouse.x + this.x < 205) {
    
        this.dy = -this.dy;
        this.score += 10;
          
          // tempo
        this.dx += 1.3;
        this.dy += 1.3;
          
       }else if(this.y - this.radius < 12 ) {
    
    const game_end = document.getElementById('game_end');
        game_end.style.display = "inline";

    let scr = document.getElementById('score');
        scr.innerHTML = this.score;
 
    // Stop spill
        this.dx = stop;
        this.dy = stop;
        delete this.drawCircle;


       }
    
        this.x += this.dx;
        this.y += this.dy;
    
        }
    }
     
     // objekt
    const ball = new Ball(300,300,Math.random() * 3 + 4, Math.random() * 3 + 4,12,0);
    
    // Loop
        function animate() {

        requestAnimationFrame(animate);
    
        c.clearRect(0,0,innerWidth,innerHeight);
    
        ball.drawCircle();
        ball.update();
        ball.drawRect();
        ball.drawRect2();
    }

animate();
}


