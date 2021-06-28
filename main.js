canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');

const canvasH = canvas.height;
const canvasW = canvas.width;

// let x = canvasW/2
// let y = canvasH-20
// let dx = 5
// let dy = -5
let x,y,dy,dx,interval
setVariables()
// drawCircle(x,y);
drawBall();
drawPaddle();
//for game over we set const interval ...
// let interval;
startGame();

function startGame(){
    interval = setInterval(()=>{
        //    if(x+dx>=canvasW || x+dx < 0){
        //        dx = -dx;
        //    }
        
        //    if()
        //    {
        //        dx = -dx;
        //    }
        
        //    if(y+dy < 0 || y+dy > canvasH)
        //    {
        //        dy = -dy;
        //    }
        //    if()
        //    {
        //        dy = -dy;
        //    }
        
            detectCollision();
            x = x+dx;
            y = y+dy;
            gameover();
            // for clear old .
            ctx.clearRect(0, 0, canvasW, canvasH);
            drawPaddle();
            drawBall();
            
        },20);
}  

function detectCollision(){
    if(x+dx>=canvasW || x+dx < 0){
        dx = -dx;
    } 
    // if(y+dy < 0 || y+dy > canvasH){
    if(y+dy < 0 ){
       dy = -dy;
   }
}

function gameover(){
    if(y===canvasH){
        alert('game over');
        clearInterval(interval);

        // set ball its original position after game over
        // x = canvasW/2
        // y = canvasH-20
        // dx = 5
        // dy = -5
        setVariables();
    }
}

function setVariables(){
    x = canvasW/2
    y = canvasH-20
    dx = 5
    dy = -5
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI,false)
    ctx.fillStyle="DA0037";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    let paddleW = 30;
    let paddleX = canvasW/2 - paddleW/2;
    let paddleY = canvasH-10;
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleW,10)
    ctx.fillStyle="#799351";
    ctx.fill();
    ctx.closePath();
}


// till 4:4:01