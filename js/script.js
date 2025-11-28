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
        formPesquisa.addEventListener('submit', function (event) {
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
        formPesquisaHero.addEventListener('submit', function (event) {
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
    document.addEventListener('click', function (event) {

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
    new Swiper("#produtos", {
        spaceBetween: 16, // Espaço entre os slides
        slidesPerView: 1.2, // Padrão mobile (mostra 1 e um pedaço do outro)
        // Melhoria: loop, autoplay e teclado
        loop: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
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
    // Carrosel de produtos
     new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 6500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    new Swiper("#myCat", {
  slidesPerView: 3,  // desktop
  spaceBetween: 20,
  pagination: {
    el: ".slider-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 2.2,
    },
    480: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 6, // PC grande
    }
  }
});

});