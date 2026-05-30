/* ===================================================================
   Portfolio interactions — Mehmet Alp Arslan
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Constellation particle network (hero background) ---------- */
    const canvas = document.getElementById('heroMatrix');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (canvas && !reduceMotion) {
        const ctx = canvas.getContext('2d');
        const hero = canvas.parentElement;
        let w, h, dpr, particles;
        const mouse = { x: -9999, y: -9999 };
        const LINK = 132;          // max distance to draw a link
        const GREEN = '0, 230, 150';

        const setup = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = hero.clientWidth; h = hero.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.min(96, Math.round(w * h / 14000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.8
            }));
        };
        setup();

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // move
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                // gentle pull toward cursor
                const dxm = mouse.x - p.x, dym = mouse.y - p.y;
                const dm = Math.hypot(dxm, dym);
                if (dm < 160) { p.x += dxm * 0.0016; p.y += dym * 0.0016; }
            }

            // links
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < LINK) {
                        ctx.strokeStyle = `rgba(${GREEN}, ${(1 - d / LINK) * 0.32})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
                // link to cursor
                const a = particles[i];
                const dcx = a.x - mouse.x, dcy = a.y - mouse.y;
                const dc = Math.hypot(dcx, dcy);
                if (dc < LINK + 30) {
                    ctx.strokeStyle = `rgba(${GREEN}, ${(1 - dc / (LINK + 30)) * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            // nodes
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${GREEN}, 0.85)`;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);

        hero.addEventListener('pointermove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        hero.addEventListener('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });

        let rT;
        window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(setup, 200); });
    }

    /* ---------- Navbar scroll state ---------- */
    const navbar = document.getElementById('navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ---------- Language toggle (TR / EN) ---------- */
    const langToggle = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    let lang = localStorage.getItem('site-lang') || 'tr';

    const applyLang = (l) => {
        document.documentElement.lang = l;
        document.querySelectorAll('[data-tr]').forEach(el => {
            const val = l === 'tr' ? el.getAttribute('data-tr') : el.getAttribute('data-en');
            if (val === null) return;
            if (val.includes('<')) el.innerHTML = val; else el.textContent = val;
        });
        // placeholders for inputs
        document.querySelectorAll('[data-tr-ph]').forEach(el => {
            el.placeholder = l === 'tr' ? el.getAttribute('data-tr-ph') : el.getAttribute('data-en-ph');
        });
        langText.textContent = l === 'tr' ? 'EN' : 'TR';
        localStorage.setItem('site-lang', l);
    };
    applyLang(lang);
    langToggle.addEventListener('click', () => {
        lang = lang === 'tr' ? 'en' : 'tr';
        applyLang(lang);
    });

    /* ---------- Scroll reveal ---------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* ---------- Service card cursor glow ---------- */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    /* ---------- Animated hero stat counters ---------- */
    const counters = document.querySelectorAll('.hero-stat .n[data-count]');
    const animateCount = (el) => {
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(target * eased);
            el.textContent = val + suffix;
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { animateCount(e.target); counterIO.unobserve(e.target); }
        });
    }, { threshold: 0.6 });
    counters.forEach(c => counterIO.observe(c));

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const subject = encodeURIComponent(data.get('subject') || 'Web sitesi mesajı');
        const body = encodeURIComponent(
            `Ad: ${data.get('name')}\nE-posta: ${data.get('email')}\n\n${data.get('message')}`
        );
        window.location.href = `mailto:alparslann95@gmail.com?subject=${subject}&body=${body}`;
        note.textContent = lang === 'tr'
            ? 'E-posta uygulamanız açılıyor… Teşekkürler!'
            : 'Opening your email app… Thank you!';
        note.classList.add('show');
        setTimeout(() => note.classList.remove('show'), 5000);
        form.reset();
    });

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                navLinks.forEach(l => l.style.color = l.getAttribute('href') === `#${id}` ? 'var(--text)' : '');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => spy.observe(s));
});
