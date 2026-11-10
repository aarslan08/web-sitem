/* ===================================================================
   Portfolio interactions — Mehmet Alp Arslan (mission-control edition)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    /* ---------- Language ---------- */
    let lang = localStorage.getItem('site-lang') || 'tr';
    const langText = $('#langText');
    const applyLang = (l) => {
        document.documentElement.lang = l;
        $$('[data-tr]').forEach(el => {
            const v = el.getAttribute(l === 'tr' ? 'data-tr' : 'data-en');
            if (v === null) return;
            if (v.includes('<') || v.includes('&')) el.innerHTML = v; else el.textContent = v;
        });
        langText.textContent = l === 'tr' ? 'EN' : 'TR';
        localStorage.setItem('site-lang', l);
    };
    applyLang(lang);
    $('#langToggle').addEventListener('click', () => { lang = lang === 'tr' ? 'en' : 'tr'; applyLang(lang); });

    /* ---------- Text scramble ---------- */
    const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';
    const scramble = (el, finalText, dur = 700) => {
        if (reduceMotion) { el.textContent = finalText; return; }
        const start = performance.now();
        cancelAnimationFrame(el._sc);
        const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            let out = '';
            for (let i = 0; i < finalText.length; i++) {
                const ch = finalText[i];
                if (ch === ' ') { out += ' '; continue; }
                out += (i / finalText.length) < p ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            el.textContent = out;
            if (p < 1) el._sc = requestAnimationFrame(step); else el.textContent = finalText;
        };
        el._sc = requestAnimationFrame(step);
    };
    $$('.scramble').forEach(el => el.addEventListener('mouseenter', () => scramble(el, el.textContent, 450)));
    const nameA = $('#nameA');
    if (nameA) nameA.addEventListener('mouseenter', () => scramble(nameA, 'MEHMET ALP', 800));

    /* ---------- Preloader ---------- */
    const loader = $('#loader'), loaderNum = $('#loaderNum'), loaderBar = $('#loaderBar'), loaderMsg = $('#loaderMsg');
    const msgs = ['INITIALIZING', 'LOADING ASSETS', 'COMPILING IDEAS', 'READY'];
    let revealed = false;
    const finishLoading = () => {
        if (revealed) return; revealed = true;
        loader.classList.add('done');
        document.body.classList.remove('is-loading');
        document.body.classList.add('ready');
        setTimeout(() => scramble(nameA, 'MEHMET ALP', 900), 500);
    };
    const total = reduceMotion ? 100 : 1500;
    const t0 = performance.now();
    const tickLoad = (now) => {
        const p = Math.min((now - t0) / total, 1);
        const eased = 1 - Math.pow(1 - p, 2.2);
        const v = Math.round(eased * 100);
        loaderNum.textContent = String(v).padStart(3, '0');
        loaderBar.style.width = v + '%';
        loaderMsg.textContent = msgs[Math.min(Math.floor(p * msgs.length), msgs.length - 1)];
        if (p < 1) requestAnimationFrame(tickLoad); else setTimeout(finishLoading, 250);
    };
    requestAnimationFrame(tickLoad);
    setTimeout(finishLoading, 4000); // fail-safe

    /* ---------- Clock (Ankara) ---------- */
    const clock = $('#clock');
    const fmt = new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const tickClock = () => { clock.textContent = fmt.format(new Date()); };
    tickClock(); setInterval(tickClock, 1000);

    /* ---------- Navbar / mobile menu ---------- */
    const navbar = $('#navbar'), mobileToggle = $('#mobileToggle'), navMenu = $('#navMenu');
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active'); navMenu.classList.toggle('active');
    });
    $$('.nav-link').forEach(l => l.addEventListener('click', () => {
        mobileToggle.classList.remove('active'); navMenu.classList.remove('active');
    }));

    /* ---------- Scroll: progress, HUD, nav state ---------- */
    const bar = $('#progress'), hudScroll = $('#hudScroll'), hudSec = $('#hudSec');
    const secs = $$('section[id]').filter(s => ['home', 'about', 'services', 'portfolio', 'contact'].includes(s.id));
    const navLinks = $$('.nav-link');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', scrollY > 24);
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? scrollY / max : 0;
        bar.style.transform = `scaleX(${p})`;
        hudScroll.textContent = String(Math.round(p * 100)).padStart(3, '0');
        let idx = 0;
        secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.45) idx = i; });
        hudSec.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(secs.length).padStart(2, '0')}`;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${secs[idx].id}`));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Pointer: HUD coords + custom cursor ---------- */
    const hudX = $('#hudX'), hudY = $('#hudY');
    const dot = $('#cursorDot'), ring = $('#cursorRing'), label = $('#cursorLabel');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('pointermove', (e) => {
        mx = e.clientX; my = e.clientY;
        hudX.textContent = String(Math.round(mx)).padStart(4, '0');
        hudY.textContent = String(Math.round(my)).padStart(4, '0');
    }, { passive: true });
    if (fine && !reduceMotion) {
        document.body.classList.add('has-cursor');
        dot.style.opacity = ring.style.opacity = 1;
        const loop = () => {
            rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
            dot.style.transform = `translate(${mx}px, ${my}px)`;
            ring.style.transform = `translate(${rx}px, ${ry}px)`;
            requestAnimationFrame(loop);
        };
        loop();
        const setState = (t) => {
            const lbl = t.closest('[data-cursor]');
            const link = t.closest('a, button, .skill-tag');
            ring.classList.toggle('big', !!(lbl && lbl.dataset.cursor));
            ring.classList.toggle('link', !(lbl && lbl.dataset.cursor) && !!link);
            label.textContent = lbl ? lbl.dataset.cursor : '';
        };
        document.addEventListener('pointerover', (e) => setState(e.target));
        document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = 0; });
        document.addEventListener('mouseenter', () => { dot.style.opacity = ring.style.opacity = 1; });
    }

    /* ---------- Magnetic elements ---------- */
    if (fine && !reduceMotion) {
        $$('.magnetic').forEach(el => {
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.25, y = (e.clientY - r.top - r.height / 2) * 0.35;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });
    }

    /* ---------- Spotlight on cards + tilt on pillars ---------- */
    $$('.pillar, .project').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
            if (fine && !reduceMotion && card.classList.contains('tilt')) {
                const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
            }
        });
        card.addEventListener('pointerleave', () => { if (card.classList.contains('tilt')) card.style.transform = ''; });
    });

    /* ---------- Scroll reveal ---------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, .mask').forEach(el => io.observe(el));

    /* ---------- Counters ---------- */
    const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '', t1 = performance.now();
            const step = (now) => {
                const p = Math.min((now - t1) / 1400, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            counterIO.unobserve(el);
        });
    }, { threshold: 0.6 });
    $$('.hero-stat .n[data-count]').forEach(c => counterIO.observe(c));

    /* ---------- Projects rail: drag + progress ---------- */
    const rail = $('#rail'), workBar = $('#workBar');
    if (rail) {
        let down = false, sx = 0, sl = 0, moved = 0;
        const upd = () => {
            if (document.getElementById('pin').classList.contains('on')) return;
            const max = rail.scrollWidth - rail.clientWidth;
            const p = max > 0 ? rail.scrollLeft / max : 0;
            const w = rail.clientWidth / rail.scrollWidth;
            workBar.style.width = (w * 100) + '%';
            workBar.style.transform = `translateX(${p * (1 / w - 1) * 100}%)`;
        };
        rail.addEventListener('scroll', upd, { passive: true });
        window.addEventListener('resize', upd); upd();
        rail.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || document.getElementById('pin').classList.contains('on')) return; down = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; });
        window.addEventListener('pointermove', (e) => {
            if (!down) return;
            const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
            if (moved > 5) rail.classList.add('dragging');
            rail.scrollLeft = sl - dx;
        });
        window.addEventListener('pointerup', () => { down = false; setTimeout(() => rail.classList.remove('dragging'), 0); });
        rail.addEventListener('click', (e) => { if (moved > 5) { e.preventDefault(); e.stopPropagation(); } }, true);
        rail.addEventListener('dragstart', (e) => e.preventDefault());
    }

    /* ---------- Contact form ---------- */
    const form = $('#contactForm'), note = $('#formNote');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const d = new FormData(form);
        const subject = encodeURIComponent(d.get('subject') || 'Web sitesi mesajı');
        const body = encodeURIComponent(`Ad: ${d.get('name')}\nE-posta: ${d.get('email')}\n\n${d.get('message')}`);
        window.location.href = `mailto:alparslann95@gmail.com?subject=${subject}&body=${body}`;
        note.textContent = lang === 'tr' ? 'E-posta uygulamanız açılıyor… Teşekkürler!' : 'Opening your email app… Thank you!';
        note.classList.add('show'); setTimeout(() => note.classList.remove('show'), 5000);
        form.reset();
    });

    /* ---------- GitHub contributions (live) ---------- */
    const ghGrid = $('#ghGrid'), ghTotal = $('#ghTotalNum');
    if (ghGrid && ghTotal) {
        fetch('https://github-contributions-api.jogruber.de/v4/aarslan08?y=last')
            .then(r => r.json())
            .then(data => {
                ghTotal.textContent = data.total.lastYear.toLocaleString('tr-TR');
                ghGrid.innerHTML = data.contributions.slice(-364).map(d => {
                    const a = d.level === 0 ? 0 : 0.25 + d.level * 0.18;
                    const bg = d.level === 0 ? '' : `style="background:rgba(198,255,61,${a})"`;
                    return `<span class="gh-cell" ${bg} title="${d.date}: ${d.count}"></span>`;
                }).join('');
            })
            .catch(() => { ghTotal.textContent = '—'; });
    }

    /* ---------- Hero WebGL: light terrain you fly through ---------- */
    const canvas = $('#heroGL');
    const scrollState = { p: 0, v: 0 };
    if (canvas && window.THREE && !reduceMotion) {
        try {
            const hero = canvas.parentElement;
            const small = innerWidth < 700;
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
            const dpr = Math.min(devicePixelRatio || 1, 2);
            renderer.setPixelRatio(dpr);
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);

            const N = small ? 110 : 230, SIZE = 22;
            const pos = new Float32Array(N * N * 3), rnd = new Float32Array(N * N);
            for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
                const k = i * N + j;
                pos[k * 3] = (i / (N - 1) - 0.5) * SIZE * 1.4;
                pos[k * 3 + 1] = 0;
                pos[k * 3 + 2] = -(j / (N - 1)) * SIZE + 4;
                rnd[k] = Math.random();
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1));
            const mat = new THREE.ShaderMaterial({
                transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
                uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector3(0, 0, -4) }, uPx: { value: dpr }, uMouseOn: { value: 0 } },
                vertexShader: `
                    uniform float uTime, uPx, uMouseOn; uniform vec3 uMouse;
                    attribute float aRnd; varying float vA; varying float vH;
                    void main(){
                        vec3 p = position;
                        float h = sin(p.x*0.55 + uTime*0.55) * cos(p.z*0.45 - uTime*0.4) * 0.9;
                        h += sin(p.x*1.3 - p.z*0.9 + uTime*0.8) * 0.28;
                        float d = distance(p.xz, uMouse.xz);
                        h += uMouseOn * exp(-d*d*0.35) * sin(d*3.2 - uTime*5.0) * 0.75;
                        p.y = h;
                        vec4 mv = modelViewMatrix * vec4(p,1.0);
                        gl_Position = projectionMatrix * mv;
                        float depth = -mv.z;
                        gl_PointSize = (1.2 + aRnd*1.4 + max(h,0.0)*1.2) * uPx * (9.0/depth);
                        vH = h;
                        vA = smoothstep(46.0, 3.0, depth) * (0.25 + 0.75*smoothstep(-0.6, 1.2, h));
                    }`,
                fragmentShader: `
                    varying float vA; varying float vH;
                    void main(){
                        float d = length(gl_PointCoord-0.5);
                        if(d>0.5) discard;
                        vec3 c = mix(vec3(0.45,0.85,0.2), vec3(0.85,1.0,0.35), smoothstep(0.0,1.2,vH));
                        gl_FragColor = vec4(c, vA*smoothstep(0.5,0.05,d));
                    }`
            });
            scene.add(new THREE.Points(geo, mat));

            const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
            let visible = true;
            new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
            const resize = () => {
                const w = hero.clientWidth, h = hero.clientHeight;
                renderer.setSize(w, h, false);
                camera.aspect = w / h; camera.updateProjectionMatrix();
            };
            resize(); window.addEventListener('resize', resize);
            window.addEventListener('pointermove', (e) => {
                const r = hero.getBoundingClientRect();
                target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
                target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
                mat.uniforms.uMouseOn.value = 1;
            }, { passive: true });

            const clk = new THREE.Clock();
            const render = () => {
                requestAnimationFrame(render);
                if (!visible) return;
                const t = clk.getElapsedTime();
                mat.uniforms.uTime.value = t;
                cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06;
                const sp = scrollState.p;
                // fly forward + rise with scroll
                camera.position.set(cur.x * 1.4, 1.5 + sp * 3.5 - cur.y * 0.3, 4.2 - sp * 9);
                camera.lookAt(cur.x * 2.2, 0.2 - sp * 1.2, -7 - sp * 9);
                camera.rotation.z = cur.x * -0.05 + scrollState.v * 0.002;
                // mouse -> terrain coords (approx)
                mat.uniforms.uMouse.value.set(cur.x * 7 * (camera.aspect > 1 ? 1 : 0.6), 0, camera.position.z - 6 - (cur.y * 0.5 + 0.5) * 8);
                canvas.style.opacity = String(Math.max(0, 1 - sp * 0.9));
                renderer.render(scene, camera);
            };
            render();
        } catch (err) { /* WebGL unavailable — page works without it */ }
    }

    /* ---------- Scroll engine: velocity, hero parallax, panels, marquee, pinned work ---------- */
    const heroInner = $('.hero-inner'), marqueeTrack = $('.marquee-track');
    const panels = $$('.panel');
    const pin = $('#pin'), railEl = $('#rail'), workSection = $('#portfolio');
    let lastY = scrollY, mq = 0, mqHalf = 0, pinned = false, pinTravel = 0;

    const measureMarquee = () => { if (marqueeTrack) mqHalf = marqueeTrack.scrollWidth / 2; };
    measureMarquee(); window.addEventListener('load', measureMarquee); window.addEventListener('resize', measureMarquee);

    const wantPin = () => !reduceMotion && innerWidth >= 1000 && fine;
    const setupPin = () => {
        if (!pin) return;
        const on = wantPin();
        pin.classList.toggle('on', on);
        railEl.style.transform = '';
        if (on) {
            railEl.scrollLeft = 0;
            pinTravel = Math.max(railEl.scrollWidth - railEl.clientWidth, 0);
            pin.style.height = (innerHeight + pinTravel) + 'px';
        } else { pin.style.height = ''; pinTravel = 0; }
        pinned = on;
    };
    setupPin(); window.addEventListener('resize', setupPin); window.addEventListener('load', setupPin);

    const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
    const frame = () => {
        const y = scrollY, vel = y - lastY; lastY = y;
        scrollState.v += (vel - scrollState.v) * 0.12;
        scrollState.p = clamp(y / innerHeight);

        if (!reduceMotion) {
            // hero content drifts and fades as you leave
            const hp = scrollState.p;
            if (heroInner) { heroInner.style.transform = `translate3d(0, ${hp * 90}px, 0)`; heroInner.style.opacity = String(1 - hp * 1.25); }

            // marquee: constant drift + scroll velocity, skew with speed
            if (marqueeTrack && mqHalf) {
                mq -= 0.7 + Math.abs(scrollState.v) * 0.45 * (scrollState.v >= 0 ? 1 : -1);
                if (mq <= -mqHalf) mq += mqHalf; if (mq > 0) mq -= mqHalf;
                marqueeTrack.style.transform = `translate3d(${mq}px,0,0) skewX(${clamp(-scrollState.v * 0.35, -14, 14)}deg)`;
            }

            // stacked panels: previous panel recedes while next slides over
            panels.forEach((el, i) => {
                const next = el.nextElementSibling;
                if (!next || next.tagName !== 'SECTION') return;
                const r = next.getBoundingClientRect();
                const p = clamp(1 - r.top / innerHeight);        // 0 = next is below fold, 1 = covering
                const sc = 1 - p * 0.06;
                el.style.transform = p > 0 && p < 1 ? `scale(${sc})` : (p >= 1 ? `scale(0.94)` : '');
                el.style.filter = p > 0 ? `brightness(${1 - p * 0.45})` : '';
            });

            // pinned horizontal projects
            if (pinned && workSection) {
                const top = pin.getBoundingClientRect().top;
                const p = clamp(-top / (pin.offsetHeight - innerHeight));
                railEl.style.transform = `translate3d(${-p * pinTravel}px,0,0)`;
                const w = railEl.clientWidth / railEl.scrollWidth;
                workBar.style.width = (w * 100) + '%';
                workBar.style.transform = `translateX(${p * (1 / w - 1) * 100}%)`;
            }
        }
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    /* ---------- Curtain page transition for nav jumps ---------- */
    const curtain = $('#curtain');
    const root = document.documentElement;
    let busy = false;
    const destOf = (hash) => hash === '#home' ? 0 : Math.max($(hash).getBoundingClientRect().top + scrollY, 0);
    const hardScroll = (y) => { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); };
    let pending = null;
    const release = () => {
        busy = false;
        root.style.scrollBehavior = '';
        root.style.overflow = ''; document.body.style.overflow = '';
        curtain.getAnimations().forEach(a => a.cancel());
        curtain.style.clipPath = 'inset(100% 0 0 0)';
        if (pending) { const h = pending; pending = null; setTimeout(() => jump(h), 30); }
    };
    const jump = (hash) => {
        if (busy) { pending = hash; return; }
        if (!$(hash)) return;
        if (reduceMotion || !curtain.animate) { root.style.scrollBehavior = ''; window.scrollTo({ top: destOf(hash), behavior: 'smooth' }); return; }
        busy = true;
        root.style.scrollBehavior = 'auto';
        root.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; // stop wheel/inertia while covered
        const fail = setTimeout(release, 3000);
        const cover = curtain.animate([{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 520, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
        cover.onfinish = () => {
            setupPin();
            hardScroll(destOf(hash));
            requestAnimationFrame(() => requestAnimationFrame(() => {
                hardScroll(destOf(hash));          // re-measure after panels/pin settle
                const open = curtain.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }], { duration: 620, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
                open.onfinish = () => { clearTimeout(fail); release(); };
            }));
        };
        cover.oncancel = () => { clearTimeout(fail); release(); };
    };
    // arriving with a #hash in the URL: wait for layout, then land precisely
    window.addEventListener('load', () => {
        if (location.hash.length > 1 && $(location.hash)) setTimeout(() => { setupPin(); hardScroll(destOf(location.hash)); }, 120);
    });
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', (e) => {
        const h = a.getAttribute('href');
        if (h.length < 2 || !$(h)) return;
        e.preventDefault(); jump(h);
    }));
});
