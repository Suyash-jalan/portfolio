// Loader Animation
        const loaderText = document.getElementById('loaderText');
        const nameText = 'Suyash Jalan';
        nameText.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.08}s`;
            loaderText.appendChild(span);
        });

        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
            initHeroAnimations();
        }, 2200);

        // Hero Animations
        function initHeroAnimations() {
            const heroLabel = document.querySelector('.hero-label');
            const heroLines = document.querySelectorAll('.hero-title .line span');
            const heroDesc = document.querySelector('.hero-desc');
            const heroCta = document.querySelector('.hero-cta-group');
            const scrollInd = document.querySelector('.scroll-indicator');

            heroLabel.style.transition = 'all 0.8s var(--ease-out-expo)';
            heroLabel.style.opacity = '1';
            heroLabel.style.transform = 'translateY(0)';

            heroLines.forEach((line, i) => {
                setTimeout(() => {
                    line.style.transition = 'all 1s var(--ease-out-expo)';
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, 400 + i * 150);
            });

            setTimeout(() => {
                heroDesc.style.transition = 'all 0.8s var(--ease-out-expo)';
                heroDesc.style.opacity = '1';
                heroDesc.style.transform = 'translateY(0)';
            }, 900);

            setTimeout(() => {
                heroCta.style.transition = 'all 0.8s var(--ease-out-expo)';
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }, 1100);

            setTimeout(() => {
                scrollInd.style.transition = 'all 0.8s var(--ease-out-expo)';
                scrollInd.style.opacity = '1';
            }, 1500);
        }

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursorDot');
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.querySelectorAll('a, button, .skill-tag, .project-card, .cert-card, .contact-link, .project-tab').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Magnetic Effect
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });

        // Scroll Reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
            revealObserver.observe(el);
        });

        // Timeline reveal
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 200);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Parallax for hero background text
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            document.querySelectorAll('.hero-bg-text').forEach((el, i) => {
                const speed = 0.2 + i * 0.1;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Form handling
        function handleSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('.form-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.style.background = '#4ade80';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                e.target.reset();
            }, 3000);
        }

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Project Tab Switching
        document.querySelectorAll('.project-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Update active tab button
                document.querySelectorAll('.project-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active content
                document.querySelectorAll('.project-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = document.getElementById('content-' + targetTab);
                targetContent.classList.add('active');
                
                // Re-trigger reveal animations for cards in the new tab
                targetContent.querySelectorAll('.reveal-scale').forEach(card => {
                    card.classList.remove('visible');
                    void card.offsetWidth; // force reflow
                    revealObserver.observe(card);
                });
            });
        });
