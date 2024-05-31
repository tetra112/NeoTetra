const gridEl    = document.querySelector('.grid')
let scoreEl     = document.querySelector('#score')
const blokkBredde = 100;
const blokkHoyde  = 20;
const brettBredde = 560;
const brettHoyde  = 300;
const ballDiameter= 20;

let xRetning = -2; 
let yRetning = 2;
let timer;

// bruker
const brukerStart = [230,10];
let brukerPos   = brukerStart;

const brukerEl = document.createElement('div');
    brukerEl.classList.add('bruker')
    gridEl.appendChild(brukerEl)
// tegn bruker
tegnBruker=()=>{
    brukerEl.style.left = brukerPos[0]+'px';
    brukerEl.style.bottom = brukerPos[1]+'px';
}
// beveg bruker
bevegBruker=(e)=>{
    switch(e.key){
        case 'ArrowLeft':
            if(brukerPos[0]>0){
                brukerPos[0]-=10;
                tegnBruker()
            }
            break
            case 'ArrowRight':
                if(brukerPos[0]<(brettBredde-blokkBredde)){
                    brukerPos[0]+=10;
                    tegnBruker()
                }
                break
    }
}
document.addEventListener('keydown',bevegBruker)

// ball
const ballStart = [270,40];
let ballPos = ballStart;

// lag ball
const ballEl = document.createElement('div')
    ballEl.classList.add('ball')
    gridEl.appendChild(ballEl)

tegnBall =()=>{
    ballEl.style.left   = ballPos[0]+'px';
    ballEl.style.bottom = ballPos[1]+'px';
}
// beveg ball
bevegBall=()=>{
    ballPos[0]+=xRetning;
    ballPos[1]+=yRetning;
    tegnBall()
    undersokKollisjon()
}
// timer
timer = setInterval(bevegBall,30)

undersokKollisjon=()=>{
    for(i=0;i<blokker.length;i++){
        if( ballPos[0]>blokker[i].bottomLeft[0] && 
            ballPos[0]<blokker[i].bottomRight[0] &&
        (   ballPos[1]+ballDiameter)>blokker[i].bottomLeft[1] &&
            ballPos[1]<blokker[i].toppLeft[1]){
            const alleBlokker = document.querySelectorAll('.blokk')
                alleBlokker[i].classList.remove('blokk')
            blokker.splice(i,1)

            if(blokker.length==0){
                clearInterval(timer)
                removeEventListener('keydown',bevegBruker)
            }
            blokkTreff()
        }
    }

    // veggtreff
    if(ballPos[0]>=(brettBredde-ballDiameter) || 
        ballPos[0]<=0 || 
        ballPos[1]>=(brettHoyde-ballDiameter)){
            endreRetning()
    }
    if(ballPos[1]<=0){
        clearInterval(timer)
        document.removeEventListener('keydown',bevegBruker)
    }
    // sjekk bruker treff
    if (ballPos[0]>brukerPos[0] &&
        ballPos[0]<(brukerPos[0]+blokkBredde) &&
        (ballPos[1]>brukerPos[1] &&
        ballPos[1]<(brukerPos[1]+blokkHoyde))
    ){
        endreRetning()
    }
}

blokkTreff=()=>yRetning = yRetning*-1;

endreRetning=()=>{
    if(xRetning==2 && yRetning==2){
        yRetning=-2
        return 
    }
    if(xRetning==2 && yRetning==-2){
        xRetning=-2
        return 
    }
    if(xRetning==-2 && yRetning==-2){
        yRetning=2
        return 
    }
    if(xRetning==-2 && yRetning==2){
        xRetning=2
        return 
    }
} 

// blokk
class Blokk {
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight= [xAxis+blokkBredde,yAxis]
        this.toppRight  = [xAxis+blokkBredde,yAxis+blokkHoyde]
        this.toppLeft   = [xAxis,yAxis+blokkHoyde]
    }
}

// alle blokker
const blokker = [
    // rad 1
    new Blokk(10,270),
    new Blokk(120,270),
    new Blokk(230,270),
    new Blokk(340,270),
    new Blokk(450,270),
    // rad 2
    new Blokk(10,240),
    new Blokk(120,240),
    new Blokk(230,240),
    new Blokk(340,240),
    new Blokk(450,240),
    // rad 3
    new Blokk(10,210),
    new Blokk(120,210),
    new Blokk(230,210),
    new Blokk(340,210),
    new Blokk(450,210)
]
tegnBlokker=()=>{
    for(i=0;i<blokker.length;i++){
        const blokkEl = document.createElement('div')
            blokkEl.classList.add('blokk')
            blokkEl.style.left = blokker[i].bottomLeft[0]+'px';
            blokkEl.style.bottom = blokker[i].bottomLeft[1]+'px';
            gridEl.appendChild(blokkEl)
    }
}



// kjører funksjoner
tegnBlokker()
tegnBall()
tegnBruker()
