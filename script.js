document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.img-prod');
  const dots = document.querySelectorAll('.slide');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');

  if (!slides.length) return;

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
});
document.addEventListener('DOMContentLoaded', () => {

  // === CÓDIGO DO CARROSSEL (Existente) ===
  const slides = document.querySelectorAll('.img-prod');
  const dots = document.querySelectorAll('.slide');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');

  if (slides.length > 0) { // Adicionei uma checagem para evitar erros
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
  // === FIM DO CÓDIGO DO CARROSSEL ===


  // ===========================================
  // === NOVO CÓDIGO DA BARRA DE PESQUISA ====
  // ===========================================
  const formPesquisa = document.getElementById('formPesquisa');
  const inputPesquisa = document.getElementById('inputPesquisa');

  // Verifica se o formulário de pesquisa existe na página atual
  if (formPesquisa) {
    
    // Adiciona um "ouvinte" para o evento de 'submit' (clique no botão ou Enter)
    formPesquisa.addEventListener('submit', function(event) {
      
      // 1. Previne o recarregamento da página (comportamento padrão do form)
      event.preventDefault(); 
      
      const termoBuscado = inputPesquisa.value;

      // 2. Verifica se algo foi digitado
      if (termoBuscado.trim() === "") {
        // Alerta se o campo estiver vazio
        Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "Digite algo para buscar!",
			footer: 'Site em manutenção'
		});
      } else {
Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "Produto não encontrado!",
			footer: 'Site em manutenção'
		});
      }
    });
  }
  // === FIM DO NOVO CÓDIGO ===

});