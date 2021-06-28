const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

let rightPressed = false;
let leftPressed = false;
let x,y,dy,dx,interval,radius,paddleW,paddleX,paddleY,brickW,brickH,brickOffset;
let bricks = [];
let score = 0;
let brickCount = 12;
let brickRows = 6;

setVariables();
drawBall();
drawPaddle();
createBrickArray();
drawBricks();
drawScore();
paddleNavigation();


function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.fillText("Score: " + score, 9, 10);
    ctx.closePath();
}

function createBrickArray() {
    for (let j = 0; j < brickRows; j++) {
        bricks[j] = [];
        for (let i = 0; i < brickCount; i++) {
            bricks[j][i] = { x: 0, y: 0, isVisible: true };
        }
    }
}

function drawBricks() {
    for (let j = 0; j < brickRows; j++) {
        for (let i = 0; i < brickCount; i++) {
            if (bricks[j][i].isVisible) {
                const brickX = 10 + i * (brickW + brickOffset);
                const brickY = (10 + brickOffset) * (j + 1);
                bricks[j][i].x = brickX;
                bricks[j][i].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickW, brickH);
                ctx.fillStyle = "#3797a4";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function paddleNavigation() {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    function handleKeyDown(e) {
        if (e.key === "ArrowRight") {
            rightPressed = true;
        }
        if (e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function handleKeyUp(e) {
        if (e.key === "ArrowRight") {
            rightPressed = false;
        }
        if (e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }
}

function detectCollision() {
    if (x + dx >= canvasW || x + dx < 0) {
        dx = -dx;
    }

    if (y + dy > canvasH - radius) {
        if (x + dx > paddleX && x + dx < paddleX + paddleW) {
            dy = -dy;
            dx = dx + (x + dx - paddleX) / 100;
        }
    }

    if (y + dy < 0) {
        dy = -dy;
    }

    for (let b = 0; b < bricks.length; b++) {
        for (let i = 0; i < bricks[b].length; i++) {
            const brick = bricks[b][i];
            if (brick.isVisible) {
                if (
                    x > brick.x &&
                    x < brick.x + brickW &&
                    y > brick.y &&
                    y < brick.y + brickH
                ) {
                    bricks[b][i].isVisible = false;
                    score += 1;
                    dy = -dy;
                    checkYouWon();
                }
            }
        }
    }
}

function startGame() {
    if (!interval) {
        interval = setInterval(() => {
            if (rightPressed) {
                paddleX = paddleX + 5;
            }
            if (leftPressed) {
                paddleX = paddleX - 5;
            }
            detectCollision();
            x = x + dx;
            y = y + dy;
            checkGameover();
            ctx.clearRect(0, 0, canvasW, canvasH);
            drawPaddle();
            drawBall();
            drawBricks();
            drawScore();
        }, 20);
    }
}

function checkGameover() {
    if (y === canvasH) {
        alert("game over");
        clearInterval(interval);
        interval = null;
        setVariables();
    }
}

function checkYouWon() {
    if (score === 72) {
        alert("You Won !!");
        clearInterval(interval);
        interval = null;
        setVariables();
    }
}

function setVariables() {
    x = canvasW / 2;
    y = canvasH - 20;
    dx = 5;
    dy = -5;
    radius = 10;
    paddleW = 50;
    paddleX = canvasW / 2 - paddleW / 2;
    paddleY = canvasH - 10;

    brickW = 40;
    brickH = 10;
    brickOffset = 8;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#389393";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleW, 10);
    ctx.fillStyle = "#3797a4";
    ctx.fill();
    ctx.closePath();
}