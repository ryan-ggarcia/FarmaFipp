document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SEÇÃO: CARROSSEL DE IMAGENS (HERO) ---
    const slides = document.querySelectorAll('.img-prod');
    const dots = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('prev');
    const btnNext = document.getElementById('next');

    if (slides.length > 0) {
        let index = 0;
        const total = slides.length;
        const setActive = (i) => {
            slides.forEach((el, idx) => el.classList.toggle('ativa', idx === i));
            dots.forEach((el, idx) => el.classList.toggle('ativar', idx === i));
        };
        const next = () => { index = (index + 1) % total; setActive(index); };
        const prev = () => { index = (index - 1 + total) % total; setActive(index); };
        setActive(index);
        let timer = setInterval(next, 8000);
        const resetTimer = () => { clearInterval(timer); timer = setInterval(next, 8000); };
        btnNext?.addEventListener('click', () => { next(); resetTimer(); });
        btnPrev?.addEventListener('click', () => { prev(); resetTimer(); });
        dots.forEach((d, i) => d.addEventListener('click', () => { index = i; setActive(index); resetTimer(); }));
    }

    // --- 2. SEÇÃO: VALIDAÇÃO DA PESQUISA (NAVBAR) ---
    const formPesquisa = document.getElementById('formPesquisa');
    const inputPesquisa = document.getElementById('inputPesquisa');

    if (formPesquisa) {
        formPesquisa.addEventListener('submit', function(event) {
            event.preventDefault();
            const termoBuscado = inputPesquisa.value;
            if (termoBuscado.trim() === "") {
                Swal.fire({ icon: "error", title: "ERRO", text: "Digite algo para buscar!" });
            } else {
                Swal.fire({ icon: "warning", title: "Oops...", text: "Produto não encontrado!" });
            }
        });
    }

    // --- 3. SEÇÃO: VALIDAÇÃO DA PESQUISA (HERO) ---
    const formPesquisaHero = document.getElementById('formPesquisaHero');
    const inputPesquisaHero = document.getElementById('inputPesquisaHero');

    if (formPesquisaHero) {
        formPesquisaHero.addEventListener('submit', function(event) {
            event.preventDefault();
            const termoBuscado = inputPesquisaHero.value;
            if (termoBuscado.trim() === "") {
                Swal.fire({ icon: "error", title: "ERRO", text: "Digite algo para buscar!" });
            } else {
                Swal.fire({ icon: "warning", title: "Oops...", text: "Produto não encontrado!" });
            }
        });
    }

    // --- 4. SEÇÃO: LÓGICA DO CARRINHO (REFATORADA) ---
    let carrinho = JSON.parse(localStorage.getItem('farmaFippCart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    function salvarCarrinho() {
        localStorage.setItem('farmaFippCart', JSON.stringify(carrinho));
    }

    function atualizarContadorCarrinho() {
        if (cartCountElement) {
            cartCountElement.textContent = carrinho.length;
        }
    }

    // MUDANÇA: Delegação de Evento
    // Ouve cliques no documento inteiro
    document.addEventListener('click', function(event) {
        
        // Verifica se o alvo do clique foi um botão com a classe '.btn-prod'
        if (event.target.classList.contains('btn-prod')) {
            const botao = event.target;
            const nome = botao.dataset.nome;
            const preco = botao.dataset.preco;

            const produto = {
                nome: nome,
                preco: parseFloat(preco)
            };

            carrinho.push(produto);
            salvarCarrinho();
            atualizarContadorCarrinho();

            Swal.fire({
                icon: 'success',
                title: 'Produto Adicionado!',
                text: `${nome} foi adicionado ao seu carrinho.`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }
    });

    atualizarContadorCarrinho();


    // --- 5. SEÇÃO: INICIALIZAÇÃO DOS CARROSSÉIS DE PRODUTOS (NOVO) ---
    
    // Inicializa o carrossel "Mais Vendidos"
    new Swiper("#mais-vendidos-carousel", {
        spaceBetween: 16, // Espaço entre os slides
        slidesPerView: 1.2, // Padrão mobile (mostra 1 e um pedaço do outro)
        
        // Navegação (setas)
        navigation: {
            nextEl: "#mais-vendidos-next",
            prevEl: "#mais-vendidos-prev",
        },
        
        // Responsividade (quantos slides mostrar por tamanho de tela)
        breakpoints: {
            576: { // sm
                slidesPerView: 2.2,
            },
            768: { // md
                slidesPerView: 3,
            },
            992: { // lg
                slidesPerView: 4,
            }
        }
    });

    // Inicializa o carrossel "Vitaminas"
    new Swiper("#vitaminas-carousel", {
        spaceBetween: 16,
        slidesPerView: 1.2,
        navigation: {
            nextEl: "#vitaminas-next",
            prevEl: "#vitaminas-prev",
        },
        breakpoints: {
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
        }
    });

    // Inicializa o carrossel "Cuidados Pessoais"
    new Swiper("#cuidados-pessoais-carousel", {
        spaceBetween: 16,
        slidesPerView: 1.2,
        navigation: {
            nextEl: "#cuidados-pessoais-next",
            prevEl: "#cuidados-pessoais-prev",
        },
        breakpoints: {
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
        }
    });

    
});