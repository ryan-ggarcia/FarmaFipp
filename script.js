const imagens = document.querySelectorAll(".imgC");
const slide = document.querySelectorAll(".slide")

let timer;
let active = 0
let total = imagens.length

const update = (direction)=>{
    document.querySelector('.imgC.ativa').classList.remove('ativa')
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
}, 6000);

// imagens.addEventListener('click', ()=>{
//     update(1)
// })