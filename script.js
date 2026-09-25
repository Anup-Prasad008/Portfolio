/* =========================================================
   ANUP PRASAD PORTFOLIO - INTERACTIVE SCRIPT
   Includes: Night Mode, Mobile Nav, Scroll Reveal,
   3D Card Tilt, Cursor Glow, Particles Canvas & Forms
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. NIGHT MODE TOGGLE (Persisted in localStorage)
    ========================================================= */
    const themeBtn = document.getElementById("themeBtn");

    if (localStorage.getItem("anup-theme") === "night") {
        document.body.classList.add("night");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("night");
            const isNight = document.body.classList.contains("night");
            localStorage.setItem("anup-theme", isNight ? "night" : "light");
        });
    }

    /* =========================================================
       2. MOBILE NAVIGATION & STICKY NAVBAR
    ========================================================= */
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(open));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinkElements = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        if (mainNav) {
            mainNav.classList.toggle("scrolled", window.scrollY > 20);
        }

        const scrollPos = window.scrollY + 140;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkElements.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    }, { passive: true });

    /* =========================================================
       3. SCROLL REVEAL (IntersectionObserver)
    ========================================================= */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================================
       4. 3D CARD TILT + ZOOM
    ========================================================= */
    document.querySelectorAll(".tilt").forEach(card => {
        if (window.matchMedia("(hover: none)").matches || window.innerWidth < 900) {
            return;
        }

        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX = (y / rect.height - 0.5) * -8;
            const rotateY = (x / rect.width - 0.5) * 10;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.03)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });

    /* =========================================================
       5. CURSOR GLOW
    ========================================================= */
    const cursorGlow = document.getElementById("cursorGlow");

    if (cursorGlow) {
        window.addEventListener("pointermove", event => {
            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
        }, { passive: true });
    }

    /* =========================================================
       6. PARTICLES CANVAS
    ========================================================= */
    const canvas = document.getElementById("particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];

        function resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const amount = Math.min(85, Math.max(35, Math.floor(window.innerWidth / 18)));
            particles = Array.from({ length: amount }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.16,
                vy: (Math.random() - 0.5) * 0.16,
                a: Math.random() * 0.24 + 0.08
            }));
        }

        function drawParticles() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            const night = document.body.classList.contains("night");

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = window.innerWidth;
                if (p.x > window.innerWidth) p.x = 0;
                if (p.y < 0) p.y = window.innerHeight;
                if (p.y > window.innerHeight) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = night
                    ? `rgba(37, 200, 187, ${p.a})`
                    : `rgba(19, 138, 131, ${p.a})`;
                ctx.fill();
            });

            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        drawParticles();
        window.addEventListener("resize", resizeCanvas);
    }

    /* =========================================================
       7. CONTACT FORM
    ========================================================= */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const receiver = "YOUR_EMAIL@example.com";
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Hello Anup,\n\n${message}\n\nFrom: ${name} (${email})`);

            window.location.href = `mailto:${receiver}?subject=${subject}&body=${body}`;
        });
    }

    /* =========================================================
       8. NEWSLETTER DEMO
    ========================================================= */
    const newsletterBtn = document.getElementById("newsletterBtn");
    const newsletterInput = document.getElementById("newsletterInput");

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener("click", () => {
            if (!newsletterInput.value.trim()) {
                alert("Please enter your email.");
                newsletterInput.focus();
                return;
            }
            alert("Thanks for subscribing! Newsletter demo is ready.");
            newsletterInput.value = "";
        });
    }

    /* =========================================================
       9. FOOTER YEAR
    ========================================================= */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});
