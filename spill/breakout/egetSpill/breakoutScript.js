/* 
    bug: ball treffer target
*/


// variabler ---------------------------------------
    const gameBoardV = {
        width:800,
        height:400,
        score:0
    }
    const playerV = {
        width:120,
        height:20,
        color:'blue',
        startPos:[(gameBoardV.width/2-(120/2)),10],
        pos:[]
    }
    const targetV = {
        width:80,
        height:20,
        color:'aqua',
        antall: 8,
        rekker: 4
    }
    const ballV = {
        diameter:50,
        color:'red',
        borderRadius:'50%',
        startPos:[(gameBoardV.width/2-(50/2)),50],
        pos:[],
        xVector: 2,
        yVector: 2
    }
    let timer;
    const tickRate = 20;
// Board --------------------------------------------
    let gameBoardEl = document.querySelector('#gameBoard')
        gameBoardEl.style.width = `${gameBoardV.width}px`;
        gameBoardEl.style.height= `${gameBoardV.height}px`;

// Player -------------------------------------------
    let playerEl = document.createElement('div')
    playerV.pos = playerV.startPos;
        
    genPlayer =()=>{
        playerEl.style.backgroundColor =playerV.color;
        playerEl.style.position = 'absolute';
        playerEl.style.width    = `${playerV.width}px`;
        playerEl.style.height   = `${playerV.height}px`;
        gameBoardEl.appendChild(playerEl)
    }
    drawPlayer=()=>{
        playerEl.style.left     = `${playerV.pos[0]}px`;
        playerEl.style.bottom   = `${playerV.pos[1]}px`;
    }
    movePlayer=(e)=>{
        switch(e.key){
            case 'ArrowLeft':
                if(playerV.pos[0]>0){
                    playerV.pos[0]-=10;
                    drawPlayer()
                }break
            case 'ArrowRight':
                if(playerV.pos[0]<(gameBoardV.width-playerV.width)){
                    playerV.pos[0]+=10;
                    drawPlayer()
                }break 
        }
    }
// Targets ------------------------------------------
    class TargetC {
        constructor (xAxis,yAxis){
            this.bottomLeft = [xAxis,yAxis];
            this.bottomRight= [xAxis+targetV.width,yAxis];
            this.toppLeft   = [xAxis,yAxis+targetV.height];
            this.toppRight  = [xAxis+targetV.width,yAxis+targetV.height];
        }
    }
    const targetArr = [];

    genClass =()=>{
        for (i=0;i<targetV.rekker;i++){
            for (j=0;j<targetV.antall;j++){
                let yPos = 370-(40*i)
                let xPos = 10+(100*j)
                targetArr.push(
                    new TargetC(xPos,yPos)
                )
            }
        }
    }
    drawTarget=()=>{
        for (i=0;i<targetArr.length;i++){
            let targetEl = document.createElement('div')
                targetEl.classList = 'targetS';
                targetEl.style.left = `${targetArr[i].bottomLeft[0]}px`
                targetEl.style.bottom = `${targetArr[i].bottomLeft[1]}px`
                gameBoardEl.appendChild(targetEl)
        }
    }

// Ball ---------------------------------------------
    ballV.pos = ballV.startPos;
    let ballEl = document.createElement('div')
        ballEl.classList = 'ballS'
        ballEl.style.width = `${ballV.diameter}px`
        ballEl.style.height = `${ballV.diameter}px`
        gameBoardEl.appendChild(ballEl)
    drawBall=()=>{
        ballEl.style.left   = `${ballV.pos[0]}px`
        ballEl.style.bottom = `${ballV.pos[1]}px`
    }
    ballVector =()=>{
        ballV.pos[0]+=ballV.xVector
        ballV.pos[1]+=ballV.yVector
        collision()
        drawBall()
    }
// Kollisjon ----------------------------------------
    collision =()=>{
        // Vegg
        if  (ballV.pos[0]<0 || 
            (ballV.pos[0]+ballV.diameter)>gameBoardV.width){
                ballV.xVector = ballV.xVector*-1;
            }
        if  ((ballV.pos[1]+ballV.diameter)>gameBoardV.height){
                ballV.yVector = ballV.yVector*-1;
        }
        if (ballV.pos[1]<0){
            clearInterval(timer)
        }
        // player
        if (
            ballV.pos[1]<(playerV.pos[1]+playerV.height) &&
            (ballV.pos[0]+ballV.diameter)>playerV.pos[0] &&
            ballV.pos[0]<(playerV.pos[0]+playerV.width)
        ){
                ballV.yVector = 2;
            }
        // target
        const allTargets = document.querySelectorAll('.targetS')
        for (i=0;i<targetArr.length;i++){
            if (
                (ballV.pos[0]+ballV.diameter)>targetArr[i].bottomLeft[0] &&
                (ballV.pos[1]+ballV.diameter)>targetArr[i].bottomLeft[1] &&
                ballV.pos[0]<targetArr[i].toppRight[0] &&
                ballV.pos[1]<targetArr[i].toppRight[1]
            ){
                allTargets[i].classList.remove('targetS')
                allTargets.splice(i,1)
                gameBoardV.score +=1;
                ballV.yVector = -2
            }
        }
        
        



    }

// Funksjoner ---------------------------------------
    genPlayer()
    genClass()
    drawPlayer()
    drawTarget()
    document.addEventListener('keydown',movePlayer)
    timer = setInterval(ballVector,tickRate)
    console.log(targetArr)

    /* genTarget =(x,yPos)=>{
        for (i=0;i<targetV.antall;i++){
            let xPos = x+100*i;
            let toppTargetEl = document.createElement('div')
            toppTargetEl.style.position = 'absolute';
            toppTargetEl.style.width    = `${targetV.width}px`;
            toppTargetEl.style.height   = `${targetV.height}px`
            toppTargetEl.style.left     = `${xPos}px`;
            toppTargetEl.style.bottom   = `${yPos}px`;
            toppTargetEl.classList = 'targetS';
            gameBoardEl.appendChild(toppTargetEl)
            
            targetArr.push(
                new TargetC(xPos,yPos)
            )
        }
    } 
    printTarget = () => {
        genTarget(10,370)
        genTarget(10,330)
        genTarget(10,290)
        genTarget(10,250)
    } */