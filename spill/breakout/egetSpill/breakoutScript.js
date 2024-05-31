// variabler ---------------------------------------
    const gameBoardV = {
        width:800,
        height:400,
    }
    const playerV = {
        width:120,
        height:20,
        color:'blue',
        startPos:[(gameBoardV.width/2-(120/2)),10]
    }
    const targetV = {
        width:80,
        height:20,
        color:'aqua',
        antall: 8
    }
    const ballV = {
        diameter:50,
        color:'red',
        borderRadius:'50%'
    }
    console.log('test')
// Board --------------------------------------------
    let gameBoardEl = document.querySelector('#gameBoard')
        gameBoardEl.style.width = `${gameBoardV.width}px`;
        gameBoardEl.style.height= `${gameBoardV.height}px`;

// Player -------------------------------------------
    let playerEl = document.createElement('div')
        
    genPlayer =()=>{
        playerEl.style.backgroundColor =playerV.color;
        playerEl.style.position = 'absolute';
        playerEl.style.width    = `${playerV.width}px`;
        playerEl.style.height   = `${playerV.height}px`;
        playerEl.style.left     = `${playerV.startPos[0]}px`;
        playerEl.style.bottom   = `${playerV.startPos[1]}px`;
        gameBoardEl.appendChild(playerEl)
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
    genTargetArr =()=>{
        for (i=0;i<targetV.antall;i++){
            let xPos = 10+100*i;
            targetArr.push(
                new TargetC(xPos,370)
            )
        }
    }
    genTargetArr()
    console.log(targetArr)
// Ball ---------------------------------------------

// Funksjoner ---------------------------------------
    genPlayer()