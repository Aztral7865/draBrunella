document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA DO MENU HAMBÚRGUER COM SCROLL SUAVE MANUAL ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Função de Scroll Suave Personalizada
    function smoothScrollTo(targetElement, duration) {
        // Posição do header para calcular o offset
        const headerOffset = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Efeito de aceleração/desaceleração para um movimento mais natural
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            const targetElement = document.querySelector(href);
            if (targetElement) {
                smoothScrollTo(targetElement, 700);
            }
            mobileMenu.classList.remove('open');
        }
    });

    // NOVO: Adiciona scroll suave para os links da navegação no DESKTOP
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o salto padrão

            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);

            if (targetElement) {
                // Reutiliza a mesma função de scroll suave
                smoothScrollTo(targetElement, 700);
            }
        });
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

    /* SCROLL SUAVE PARA O BOTÃO "AGENDE SUA CONSULTA"
    const ctaButton = document.getElementById('cta-button-hero');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            if (targetElement) {
                smoothScrollTo(targetElement, 700);
            }
        });
    }
    */

});


