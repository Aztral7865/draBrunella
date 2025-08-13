document.addEventListener("DOMContentLoaded", function () {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.remove('open');
        }
    });

    // --- ANIMAÇÃO DO HEADER AO ROLAR (LÓGICA CORRIGIDA) ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        // Se a rolagem for maior que 50 pixels
        if (window.scrollY > 50) {
            // Adiciona a classe que deixa o fundo branco e com sombra
            header.classList.add('scrolled');
        } else {
            // Remove a classe, fazendo o fundo voltar a ser transparente
            header.classList.remove('scrolled');
        }
    });

    // --- EFEITO DE FADE-IN NAS SEÇÕES ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
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
