document.addEventListener('DOMContentLoaded', () => {

    // 1. Pega os elementos do DOM
    const cartContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');
    const emptyCartMsg = document.getElementById('empty-cart-message');
    const cartCountElement = document.getElementById('cart-count'); // Contador da Navbar
    const clearCartButton = document.getElementById('clear-cart-button');

    // 2. Carrega o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('farmaFippCart')) || [];

    // Função para salvar o carrinho (usada ao remover)
    function salvarCarrinho() {
        localStorage.setItem('farmaFippCart', JSON.stringify(carrinho));
    }

    // Função para atualizar o contador da navbar
    function atualizarContadorNavbar() {
        if (cartCountElement) {
            cartCountElement.textContent = carrinho.length;
        }
    }

    // 3. Função principal para renderizar (desenhar) o carrinho na tela
    function renderizarCarrinho() {
        // Limpa o container antes de adicionar novos itens
        cartContainer.innerHTML = '';
        
        // Reseta o total
        let subtotal = 0;

        // Atualiza o contador da navbar
        atualizarContadorNavbar();

        // 4. Verifica se o carrinho está vazio
        if (carrinho.length === 0) {
            emptyCartMsg.classList.remove('d-none'); // Mostra a mensagem de vazio
            cartSubtotalEl.textContent = 'R$ 0,00';
            cartTotalEl.textContent = 'R$ 0,00';
            return; // Para a execução
        }
        
        // Esconde a mensagem de vazio (caso ela estivesse visível)
        emptyCartMsg.classList.add('d-none');

        // 5. Loop para criar o HTML de cada item
        carrinho.forEach((produto, index) => {
            // Soma o preço ao subtotal
            subtotal += produto.preco;

            // Cria os elementos HTML para o item
            const itemDiv = document.createElement('div');
            itemDiv.className = 'd-flex justify-content-between align-items-center mb-3 pb-3 border-bottom';
            
            itemDiv.innerHTML = `
                <div>
                    <h5 class="mb-0">${produto.nome}</h5>
                    <span class="text-success fw-bold">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="btn btn-outline-danger btn-sm btn-remover" data-index="${index}" title="Remover item">
                    <i class="bi bi-trash-fill"></i>
                </button>
            `;
            
            // Adiciona o item criado ao container
            cartContainer.appendChild(itemDiv);
        });

        // 6. Atualiza os totais no resumo
        cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        cartTotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`; // (Assumindo frete grátis)

        // 7. Adiciona os "ouvintes" aos novos botões de remover
        adicionarEventListenersRemover();
    }

    // 8. Função para adicionar "ouvintes" de clique aos botões de lixeira
    function adicionarEventListenersRemover() {
        document.querySelectorAll('.btn-remover').forEach(botao => {
            botao.addEventListener('click', removerItemCarrinho);
        });
    }

    // 9. Função que é chamada ao clicar em remover
    function removerItemCarrinho(event) {
        // Pega o 'data-index' do botão que foi clicado
        const indexParaRemover = parseInt(event.currentTarget.dataset.index);

        // Remove o item do array 'carrinho'
        carrinho.splice(indexParaRemover, 1);

        // Salva o carrinho atualizado no localStorage
        salvarCarrinho();

        // Redesenha o carrinho na tela
        renderizarCarrinho();

        // Mostra um alerta de sucesso
        Swal.fire({
            icon: 'success',
            title: 'Produto Removido',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    }

    // 10. Função para limpar o carrinho
    clearCartButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Isso removerá todos os itens do seu carrinho.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, limpar carrinho!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrinho = []; // Esvazia o array
                salvarCarrinho(); // Salva o array vazio
                renderizarCarrinho(); // Redesenha a tela (que mostrará a msg de vazio)
                
                Swal.fire(
                    'Carrinho Limpo!',
                    'Seu carrinho está vazio.',
                    'success'
                )
            }
        })
    });


    // 11. Chama a função principal para desenhar o carrinho assim que a página carrega
    renderizarCarrinho();

    // Adiciona a lógica de pesquisa também nesta página
    const formPesquisa = document.getElementById('formPesquisa');
    const inputPesquisa = document.getElementById('inputPesquisa');
    if (formPesquisa) {
        formPesquisa.addEventListener('submit', (e) => {
            e.preventDefault();
            // Apenas redireciona para a home com o termo
            const termo = inputPesquisa.value;
            window.location.href = `index.html?search=${termo}`;
        });
    }
});