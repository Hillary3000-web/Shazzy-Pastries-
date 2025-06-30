
        // Loading screen
        window.addEventListener('load', function() {
            const loading = document.querySelector('.loading');
            setTimeout(() => {
                loading.classList.add('hide');
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation link
        function updateActiveNav() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('[data-section]');
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                }
            });
        }

        // Scroll animations
        function animateOnScroll() {
            const sections = document.querySelectorAll('section:not(.hero)');
            const menuItems = document.querySelectorAll('.menu-item');
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionVisible = sectionTop < window.innerHeight - 100;
                
                if (sectionVisible) {
                    section.classList.add('animate');
                }
            });

            // Animate menu items with stagger effect
            menuItems.forEach((item, index) => {
                const itemTop = item.getBoundingClientRect().top;
                const itemVisible = itemTop < window.innerHeight - 50;
                
                if (itemVisible && !item.classList.contains('animate')) {
                    const delay = parseInt(item.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, delay);
                }
            });
        }

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll event listener
        window.addEventListener('scroll', function() {
            updateActiveNav();
            animateOnScroll();
            toggleBackToTop();
        });

        // Initialize animations on page load
        window.addEventListener('DOMContentLoaded', function() {
            animateOnScroll();
            updateActiveNav();
        });

        // Menu item click effect
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const itemName = this.querySelector('h3').textContent;
                const itemPrice = this.querySelector('.menu-price').textContent;
                const message = `Hi! I'd like to order ${itemName} (${itemPrice}). Is it available?`;
                const whatsappUrl = `https://wa.me/+2348152525397?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        });

        // pulse animation to CTA button
        const ctaButton = document.querySelector('.cta-button');
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            
            if (hero) {
                hero.style.backgroundPosition = `center ${rate}px`;
            }
        });

        // typing effect to tagline
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect
        window.addEventListener('load', function() {
            setTimeout(() => {
                const tagline = document.querySelector('.tagline');
                const originalText = tagline.textContent;
                typeWriter(tagline, originalText, 80);
            }, 1500);
        });

        // error handling for WhatsApp links
        function handleWhatsAppError() {
            const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
            whatsappLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Check if WhatsApp is available
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (!isMobile) {
                        const confirmOpen = confirm('This will open WhatsApp Web. Continue?');
                        if (!confirmOpen) {
                            e.preventDefault();
                        }
                    }
                });
            });
        }

        // Initialize error handling
        handleWhatsAppError();