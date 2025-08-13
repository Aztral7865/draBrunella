document.addEventListener("DOMContentLoaded", function () {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    // Fecha o menu se um link for clicado (opcional, mas bom para UX)
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.remove('open');
        }
    });


    // --- EFEITO DE FADE-IN NAS SEÇÕES ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // Começa a animação quando 10% do elemento está visível
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
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

    // --- ANIMAÇÃO DO HEADER AO ROLAR ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
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
