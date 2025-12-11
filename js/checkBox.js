var produtos = [
    {
        id: 1,
        nome: "Dipirona",
        fornecedor: "Ryan Transportes",
        estoque: 1000,
        data: "12-12-2025",
        preco: 4.50
    }
];

var formValidado = true;

// FORM PRINCIPAL
const form = document.getElementById("form")
const nome = document.getElementById("nome")
const data = document.getElementById("data")
const forn = document.getElementById("Fornecedor")
const quant = document.getElementById("quant")
const preco = document.getElementById("preco")

// MODAL
const nomeModal = document.getElementById("modal-nome")
const fornModal = document.getElementById("modal-fornecedor")
const quantModal = document.getElementById("modal-quant")
const dataModal = document.getElementById("modal-data")
const precoModal = document.getElementById("modal-preco")

const modal = document.getElementById("modal-alterar")
const salvar = document.getElementById("modal-form")

let indiceAlterar = -1 // CORRETO


function resetValidacao() {
    formValidado = true;
}

function validaItens() {
    resetValidacao();
    validaCampo(nome);
    validaCampo(forn);
    validaCampo(quant);
    validaCampo(data);
    validaCampo(preco);
}

function validaCampo(obj) {
    let parent = obj.parentElement.parentElement;
    let msgErro = parent.querySelector(".error");
    let msgSucesso = parent.querySelector(".sucess");

    if (obj.value.trim() === "") {
        msgErro.style.display = "flex";
        msgSucesso.style.display = "none";
        formValidado = false;
    } else {
        msgErro.style.display = "none";
        msgSucesso.style.display = "flex";
    }
}

function validaTab() {
    resetValidacao();
    validaCampo(nomeModal);
    validaCampo(fornModal);
    validaCampo(quantModal);
    validaCampo(dataModal);
    validaCampo(precoModal);
}

document.addEventListener("DOMContentLoaded", () => {
    montarTabela()
})

function montarTabela() {
    let tbody = document.getElementById("tbody")
    let html = ""

    for (let item of produtos) {
        html += `
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.nome}</td>
                <td>${item.fornecedor}</td>
                <td>${item.estoque}</td>
                <td>${item.data}</td>
                <td>R$ ${item.preco}</td>
                <td><button class="btn btn-outline-danger" onclick="excluirTab(${item.id})"><i class="fi fi-rs-trash"></i></button></td>
                <td><button class="btn btn-outline-warning" onclick="alterar(${item.id})"><i class="fi fi-sr-pencil"></i></button></td>
            </tr>
        `
    }

    tbody.innerHTML = html
}


function adicinarProdutos() {
    let novoItem = {
        id: new Date().getTime(),
        nome: nome.value,
        fornecedor: forn.value,
        estoque: quant.value,
        data: data.value,
        preco: preco.value
    }

    produtos.push(novoItem)
    montarTabela()
    Swal.fire({
        title: "Adicionado!",
        text: "O produto foi adicionado com sucesso!",
        icon: "success"
    });
}


function excluirTab(idItem) {
    Swal.fire({
        title: "Confirmar Exclusão?",
        text: "Essa ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, atualizar"
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: "Excluído!",
                text: "O produto foi excluído com sucesso!",
                icon: "success"
            });
            produtos = produtos.filter(p => p.id !== idItem)
            montarTabela()
        }
    });
}

function excluirTudo() {
    if (produtos.length === 0) {
        Swal.fire({
            title: "Nenhum produto para excluir",
            text: "A tabela já está vazia!",
            icon: "error"
        });
        return;
    } else {
        Swal.fire({
            title: "Confirmar Exclusão?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, atualizar"
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire({
                    title: "Excluído!",
                    text: "A tabela foi excluído com sucesso!",
                    icon: "success"
                });
                produtos = [];
                montarTabela();
                modal.style.display = "none";
            }
        });
    }
}

function alterar(idItem) {

    indiceAlterar = produtos.findIndex(p => p.id === idItem);

    // Salvando os valores originais ANTES de alterar
    produtos[indiceAlterar].original = { ...produtos[indiceAlterar] };

    nomeModal.value = produtos[indiceAlterar].nome;
    fornModal.value = produtos[indiceAlterar].fornecedor;
    quantModal.value = produtos[indiceAlterar].estoque;
    dataModal.value = produtos[indiceAlterar].data;
    precoModal.value = produtos[indiceAlterar].preco;

    modal.style.display = "flex";
}

salvar.addEventListener("submit", (e) => {
    e.preventDefault();

    validaTab();
    if (!formValidado) return;

    let original = produtos[indiceAlterar].original;

    // Verifica se mudou ALGUM campo
    let mudou =
        nomeModal.value.trim() !== original.nome ||
        fornModal.value.trim() !== original.fornecedor ||
        quantModal.value.trim() !== original.estoque ||
        dataModal.value.trim() !== original.data ||
        precoModal.value.trim() !== original.preco;

    if (!mudou) {
        Swal.fire({
            title: "Nenhuma alteração feita",
            text: "Nada foi modificado!",
            icon: "info"
        });
        return;
    }

    // Se mudou → confirmar
    Swal.fire({
        title: "Confirmar alterações?",
        text: "Deseja atualizar os dados do produto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, atualizar"
    }).then((result) => {

        if (result.isConfirmed) {

            // Agora SIM altera o objeto real
            produtos[indiceAlterar].nome = nomeModal.value;
            produtos[indiceAlterar].fornecedor = fornModal.value;
            produtos[indiceAlterar].estoque = quantModal.value;
            produtos[indiceAlterar].data = dataModal.value;
            produtos[indiceAlterar].preco = precoModal.value;

            Swal.fire({
                title: "Alterado!",
                text: "O produto foi atualizado.",
                icon: "success"
            });

            montarTabela();
            modal.style.display = "none";
        }
    });
});


form.addEventListener("submit", (e) => {
    e.preventDefault()
    validaItens()

    if (formValidado) {
        adicinarProdutos()
        form.reset()
    }
})

function fecharModal() {
    modal.style.display = "none"
}
