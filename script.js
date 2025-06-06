const imagens = document.querySelectorAll(".img-prod");
const slide = document.querySelectorAll(".slide")
const btnPrev = document.getElementById("prev")
const btnNext = document.getElementById("next")

let timer;
let active = 0
let total = imagens.length

const update = (direction)=>{
    document.querySelector('.img-prod.ativa').classList.remove('ativa')
    document.querySelector('.slide.ativar').classList.remove('ativar')

    if(direction > 0){
        active = active + 1;
        if(active == total){
            active = 0
        }
    }else{
        active = active -1;
        if(active<0){
            active = total -1
        }
    }

    imagens[active].classList.add('ativa')
    slide[active].classList.add('ativar')
    
}
clearTimeout(timer)
timer = setInterval(() => {
    update(1)
}, 8000);

btnNext.addEventListener('click', ()=>{
    update(1)
})
btnPrev.addEventListener('click',()=>{
    update(-1)
})