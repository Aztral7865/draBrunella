document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    // CORREÇÃO: Lógica de clique nos links do menu mobile com SCROLL SUAVE
    mobileMenu.addEventListener('click', (e) => {
        // Garante que o alvo do clique é um link <a>
        if (e.target.tagName === 'A') {
            e.preventDefault(); // Previne o "salto" padrão do navegador

            const href = e.target.getAttribute('href'); // Pega o destino (ex: "#sobre")
            const targetElement = document.querySelector(href); // Encontra a seção de destino

            // Se o elemento de destino existir, rola suavemente até ele
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Fecha o menu após o clique
            mobileMenu.classList.remove('open');
        }
    });


    // --- EFEITO DE FADE-IN NAS SEÇÕES ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        appearOnScroll.observe(elem);
    });

    // --- CLIQUE NOS VÍDEOS PARA REDIRECIONAR ---
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const youtubeUrl = card.dataset.youtubeUrl;
            if (youtubeUrl) {
                window.open(youtubeUrl, '_blank');
            }
        });
    });

});
