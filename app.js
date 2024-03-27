document.addEventListener('DOMContentLoaded',()=>{
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
let timerId
let score = 0
let xDirection = 2
let yDirection = 2

const userStart = [230,0]
let currentPosition = userStart

const ballStart = [270,30]
let ballCurrentPosition = ballStart

function drawBall () {
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}
// add user

const user = document.createElement('div')
user.classList.add("user")
grid.appendChild(user)

function moveUser (e){
    switch (e.key){
        case 'ArrowLeft':
            if(currentPosition[0]!==0){
            user.style.left= currentPosition[0] -10+'px'
            currentPosition[0]-=10
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0]!==boardWidth-blockWidth){
            user.style.left= currentPosition[0] +10+'px'
            currentPosition[0]+=10
            }
            break

    }
}
document.addEventListener('keydown',moveUser)




class Block {
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis]
        this.bottomRight=[xAxis+blockWidth,yAxis]
        this.topLeft=[xAxis,yAxis+blockHeight]
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight]
    }
}

let blocks = [
    new Block (10,270),
    new Block (120,270),
    new Block (230,270),
    new Block (340,270),
    new Block (450,270),
    new Block (10,240),
    new Block (120,240),
    new Block (230,240),
    new Block (340,240),
    new Block (450,240),
    new Block (10,210),
    new Block (120,210),
    new Block (230,210),
    new Block (340,210),
    new Block (450,210)
]

//add block

for (let i=0;i<blocks.length;i++){
    const block = document.createElement('div')
    block.classList.add("block")
    block.style.left = blocks[i].bottomLeft[0]+'px'
    block.style.bottom = blocks[i].bottomLeft[1]+'px'

    grid.appendChild(block)
}

//add ball

const  ball = document.createElement('div')
ball.classList.add("ball")
grid.appendChild(ball)

drawBall()
//move the ball

function moveBall (){
    ballCurrentPosition[0]+=xDirection
    ballCurrentPosition[1]+=yDirection
    drawBall()
    
    checkForCollision()

}

timerId = setInterval(moveBall, 20)

// check for collision

function checkForCollision(){
    for (let i=0;i<blocks.length;i++){
        if(ballCurrentPosition[0]>blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0]<blocks[i].bottomRight[0] &&
            ballCurrentPosition[1]+10>blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1]<blocks[i].topLeft[1]){
                const allBlocks = document.querySelectorAll('.block') 
                allBlocks[i].classList.remove('block')
                blocks.splice(i,1)
                console.log(xDirection,yDirection)
                changeDirection()
                score++
                scoreDisplay.innerHTML=score
                if (blocks.length==0){
                    scoreDisplay.innerHTML='You win!'
                    clearInterval(timerId)
                    document.removeEventListener('keydown',moveUser)
                }
            }
    }
    // check for wall collision

    if (ballCurrentPosition[0]==0 ||
        ballCurrentPosition[0]==boardWidth-10||
        ballCurrentPosition[1]==boardHeight-10){
            if(xDirection===2 && yDirection===2 ){
                xDirection=-2
                return
            }
            if(xDirection===2 && yDirection===-2 ){
                xDirection=-2
                return
            }
            if(xDirection===-2 && yDirection===-2 ){
                xDirection=2
                return
            }
            if(xDirection===-2 && yDirection===2 ){
                xDirection=2
                return
            }    
    }

    // check for user collision

    if(ballCurrentPosition[0]>currentPosition[0] &&
        ballCurrentPosition[0]<currentPosition[0]+blockWidth &&
        ballCurrentPosition[1]>currentPosition[1]&&
        ballCurrentPosition[1]<currentPosition[1]+blockHeight){

            if(xDirection===-2 && yDirection===-2 ){
                yDirection=2
                return
            }
            if(xDirection===2 && yDirection===-2 ){
                yDirection=2
                return
            }

    }

    //gameover check

    if(ballCurrentPosition[1]<=0){

        clearInterval(timerId)
        scoreDisplay.innerHTML='You lose!'
        document.removeEventListener('keydown', moveUser)

    }

}

function changeDirection(){
    if(xDirection===2 && yDirection===2 ){
        yDirection=-2
        return
    }
    if(xDirection===2 && yDirection===-2 ){
        xDirection=-2
        return
    }
    if(xDirection===-2 && yDirection===-2 ){
        yDirection=2
        return
    }
    if(xDirection===-2 && yDirection===2 ){
        yDirection=-2
        return
    }
}








})