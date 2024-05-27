const sekundEl = document.querySelector('#sekund')
const minuttEl = document.querySelector('#minutt')
const timeEl = document.querySelector('#time')

tidF = () => {
    const now = new Date()
    const sekunder = now.getSeconds()
    const minutter = now.getMinutes()
    const timer = now.getHours()
    const tidsinterval=360/60;

    sekundEl.style.transform="rotate("+(sekunder*tidsinterval)+"deg";
    minuttEl.style.transform="rotate("+(minutter*tidsinterval+sekunder/10)+"deg";
    timeEl.style.transform="rotate("+(timer*30+minutter/2)+"deg";

}
setInterval(tidF,100)