var produtos = [ // variavel a onde vai ficar os itens
    {
        id:1,
        nome: "Dipirona",
        fornecedor: "Ryan Transportes",
        estoque: 1000,
        data: "12-12-2025",
        preco: 4.50
    }
]
var formValidado = true
const form = document.getElementById("form")
const nome = document.getElementById("nome")
const data = document.getElementById("data")
const forn = document.getElementById("Fornecedor")
const quant = document.getElementById("quant")
const preco = document.getElementById("preco")
function validaItens(){
    if(nome.value.trim() === "") exibiErro(nome,"Campo incorreto");
    else exibiTrue(nome)

    if(forn.value.trim() === "") exibiErro(forn,"Campo incorreto");
    else exibiTrue(forn)

    if(quant.value.trim() === "") exibiErro(quant,"Campo incorreto");
    else exibiTrue(quant)

    if(data.value.trim() === "") exibiErro(data,"Campo incorreto");
    else exibiTrue(data)

    if(preco.value.trim() === "") exibiErro(preco,"Campo incorreto");
    else exibiTrue(preco)
}

function exibiErro(obj,mensagem){
    let parent = obj.parentElement.parentElement
    let mensagemErro = parent.querySelector(".error")
    let textErro = parent.querySelector(".message-error")
    mensagemErro.style.display = "block"
    textErro.innerHTML = mensagem
    formValidado = false
}
document.addEventListener("DOMContentLoaded",()=>{
    montarTabela()
})
function exibiTrue(obj){
    let parent = obj.parentElement.parentElement
	let mensagemErro = parent.querySelector('.error')
	let mensagemTrue = parent.querySelector('.sucess')
	let textSucces = parent.querySelector('.message-true')
	textSucces.innerHTML = "Campo preenchido corretamente!"
	obj.className = "input-style msg-true"
	mensagemTrue.style.display = "flex"
	mensagemErro.style.display = "none"
	formValidado = true
}
function adicinarProdutos(){
    let novoItem = { // Criando o objeto que vai armazenar as informações
        id: new Date().getTime(),
        nome: nome.value,
        fornecedor: forn.value,
        estoque: quant.value,
        data: data.value,
        preco:preco.value
    }
    produtos.push(novoItem) // enviando o objeto para a variavel
    montarTabela()
}
function montarTabela(){
    let tbody = document.getElementById("tbody")
    let html = ``
    for(let item of produtos){
        html+=`
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.nome}</td>
                <td>${item.fornecedor}</td>
                <td>${item.estoque}</td>
                <td>${item.data}</td>
                <td>R$ ${item.preco}</td>
                <td>Excluir linha <input type="checkbox" id="btn-check" onclick="excluirTab(${item.id})"></td>
            </tr>
        `
    }
    tbody.innerHTML = html
}
function excluirTab(idItem){
    let aux = []

    for(let i =0; i < produtos.length;i++){
        if(produtos[i].id != idItem){
            aux.push(produtos[i])
        }
    }

    produtos = aux
    montarTabela()
}
function excluirTudo(){
    let aux = []
    produtos = aux
    montarTabela()
    
}
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    validaItens()
    if(formValidado === true) adicinarProdutos()
})

