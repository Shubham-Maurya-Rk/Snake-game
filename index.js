let direction = { x: 0, y: 0 };
const gameContainer = document.querySelector('.gameContainer');
const gameBox = document.querySelector('.gameBox');
const bgSound=new Audio('./Snake Song.mp3');
const gameOver=new Audio('./gameOver.wav');
const turn=new Audio('./turn.wav');
const eat=new Audio('./Eat.wav');
let snake = [{ x: 14, y: 15 }];
let food = { x: 10, y: 11 };
let lastPaintTime = 0;
let speed = 8;
let score = 0;
let inputDir = { x: 0, y: 0 };

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){
            return true;
        }
    }
    if(snakeArr[0].x>=20 || snakeArr[0].x<=0|| snakeArr[0].y>=20 || snakeArr[0].y<=0){
        return true;
    }
}

function gameEngine() {
    if (isCollide(snake)) {
        bgSound.pause();
        gameOver.play();    
        alert("Game Over! press any key to start again.")
        score = 0;
        inputDir = { x: 0, y: 0 };
        snake = [{ x: 14, y: 15 }];
        let Score=document.getElementById('score');
        Score.innerText=score;
    }
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
        eat.play();
        setTimeout(()=>{
            eat.pause();
            eat.currentTime=0;
        },200);
        score += 1;
        let a = 2; let b = 19;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        let Score=document.getElementById('score');
        Score.innerText=score;
    }

    for (let i = snake.length - 2; i >= 0; i -= 1) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += inputDir.x;
    snake[0].y += inputDir.y;
    gameBox.innerHTML = "";
    snake.forEach((e, index) => {
        let snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = e.x;
        snakeEle.style.gridColumnStart = e.y;
        if (index === 0) {
            snakeEle.classList.add('snakeHead');
        } else {
            snakeEle.classList.add('snakeBody');
        }
        gameBox.appendChild(snakeEle);
    });
    //**************Food**************
    let foodEle = document.createElement('div');
    foodEle.style.gridRowStart = food.x;
    foodEle.style.gridColumnStart = food.y;
    foodEle.classList.add('food');
    gameBox.appendChild(foodEle);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    bgSound.play();
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowRight":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        default:
            break;
    }
})