/* 
    Neste ting som skal gjøres er å lage kollisjonskode mellom ball og target
    se linje: 140
*/


// variabler ---------------------------------------
    const gameBoardV = {
        width:800,
        height:400,
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
    const tickRate = 30;
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
    genTarget =(x,yPos)=>{
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
        if  (ballV.pos[1]<0 || 
            (ballV.pos[1]+ballV.diameter)>gameBoardV.height){
                ballV.yVector = ballV.yVector*-1;
        }
        // player
        if ((ballV.pos[0]+ballV.diameter)>playerV.pos[0] && 
            ballV.pos[0]<(playerV.pos[0]+playerV.width) &&
            ballV.pos[1]<(playerV.pos[1]+playerV.height)
            ){
                ballV.yVector = ballV.yVector*-1;
            }
        // target
        
    }

// Funksjoner ---------------------------------------
    genPlayer()
    printTarget()
    drawPlayer()
    document.addEventListener('keydown',movePlayer)
    timer = setInterval(ballVector,tickRate)

/*

*/