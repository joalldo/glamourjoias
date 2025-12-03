// Smooth scrolling for navigation links
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-wrapper');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Add hover effects to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Loading animation for page
document.addEventListener('DOMContentLoaded', () => {
    // Fade in hero section
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hero.style.transition = 'all 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate product cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.8s ease';
        observer.observe(header);
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navigation mobile toggle intentionally disabled: mobile menu button must not appear
const createMobileMenu = () => {
    // no-op to prevent insertion of mobile menu button
};

// Do not initialize mobile menu
// createMobileMenu();

// Mobile menu toggle (top-left) behavior
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', (!expanded).toString());
        navMenu.classList.toggle('mobile-active');
    });

    // Close mobile menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            if (navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Ensure menu is closed on resize to avoid stuck state when crossing breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 880 && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
});


// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return; // Sair se carrossel não existir
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (!slides.length || !dotsContainer || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        const offset = -100 * currentSlide;
        carousel.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto advance slides
    let interval = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });
});

// Funções do carrinho
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    if (!modal) {
        console.warn('Modal do carrinho não encontrado');
        return;
    }
    const isVisible = modal.style.display === 'flex' || modal.style.display === 'block';
    modal.style.display = isVisible ? 'none' : 'flex';
    
    if (!isVisible) {
        // Atualizar conteúdo do carrinho ao abrir
        updateCartDisplay();
    }
}

// Se a página não tiver o modal do carrinho, injetar um padrão mantendo a estética
function ensureCartModalExists() {
    if (document.getElementById('cart-modal')) return;

    const modalHtml = `
    <div id="cart-modal" class="cart-modal" style="display: none;">
        <div class="cart-modal-overlay" onclick="toggleCartModal()"></div>
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Meu Carrinho</h2>
                <button onclick="toggleCartModal()" class="cart-modal-close">&times;</button>
            </div>
            <div class="cart-modal-body">
                <div id="cart-items-list"></div>
                <div id="cart-empty-message" style="text-align: center; padding: 20px;">
                    Seu carrinho está vazio
                </div>
            </div>
            <div class="cart-modal-footer">
                <div class="cart-total">Total: <span id="cart-total">R$ 0,00</span></div>
                <button id="cart-checkout" class="cart-checkout-btn">Finalizar Compra</button>
            </div>
        </div>
    </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHtml;
    document.body.appendChild(wrapper.firstElementChild);

    // adicionar listener do checkout (o restante do script já assume existência)
    const checkoutBtn = document.getElementById('cart-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            if (cartItems.length === 0) return;

            let message = 'Olá! Gostaria de fazer um pedido:%0A%0A';
            let total = 0;

            cartItems.forEach(item => {
                const itemTotal = item.price * (item.quantity || 1);
                message += `• ${item.quantity}x ${item.name}%0A`;
                message += `  R$ ${item.price.toFixed(2).replace('.', ',')} cada%0A`;
                message += `  Subtotal: R$ ${itemTotal.toFixed(2).replace('.', ',')}%0A%0A`;
                total += itemTotal;
            });

            message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
            window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
        });
    }
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyMessage = document.getElementById('cart-empty-message');
    const checkoutBtn = document.getElementById('cart-checkout');
    // Garantir que exista um elemento #cart-count; se não, cria próximo ao primeiro .nav-cart
    let cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        const firstNavCart = document.querySelector('.nav-cart');
        if (firstNavCart) {
            const span = document.createElement('span');
            span.id = 'cart-count';
            span.textContent = '0';
            // posicionamento depende do CSS; colocar como último filho do wrapper do ícone
            const parent = firstNavCart.parentElement || firstNavCart.parentNode;
            parent.style.position = parent.style.position || 'relative';
            parent.appendChild(span);
            cartCount = span;
        }
    }
    const cartTotal = document.getElementById('cart-total');
    
    // Recuperar itens do carrinho do localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Atualizar contador (soma das quantidades)
    if (cartCount) {
        const totalCount = cartItems.reduce((sum, it) => sum + (it.quantity || 1), 0);
        cartCount.textContent = totalCount;
        cartCount.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    
    if (cartItems.length === 0) {
        cartItemsList.style.display = 'none';
        emptyMessage.style.display = 'block';
        checkoutBtn.disabled = true;
        cartTotal.textContent = 'R$ 0,00';
    } else {
        cartItemsList.style.display = 'block';
        emptyMessage.style.display = 'none';
        checkoutBtn.disabled = false;
        
        // Calcular total
        const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        
        // Renderizar itens
        cartItemsList.innerHTML = cartItems.map((item, index) => `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                <div>
                    <div style="font-weight: 500;">${item.name}</div>
                    <div style="color: #666;">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateItemQuantity(${index}, ${(item.quantity || 1) - 1})" 
                            style="background: none; border: none; cursor: pointer;">-</button>
                    <span>${item.quantity || 1}</span>
                    <button onclick="updateItemQuantity(${index}, ${(item.quantity || 1) + 1})"
                            style="background: none; border: none; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${index})" 
                            style="background: none; border: none; color: #ff4444; cursor: pointer;">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

function addToCart(name, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

function updateItemQuantity(index, newQuantity) {
    if (newQuantity < 1) return;
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems[index].quantity = newQuantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

// Inicializar carrinho
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    
    // Adicionar evento para o botão de checkout
    document.getElementById('cart-checkout').addEventListener('click', () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (cartItems.length === 0) return;
        
        let message = 'Olá! Gostaria de fazer um pedido:%0A%0A';
        let total = 0;
        
        cartItems.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            message += `• ${item.quantity}x ${item.name}%0A`;
            message += `  R$ ${item.price.toFixed(2).replace('.', ',')} cada%0A`;
            message += `  Subtotal: R$ ${itemTotal.toFixed(2).replace('.', ',')}%0A%0A`;
            total += itemTotal;
        });
        
        message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
        window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
    });
});

// Conectar ícone do nav (top-right) ao modal do carrinho
document.addEventListener('DOMContentLoaded', () => {
    const navCartIcon = document.getElementById('nav-cart-icon');
    if (navCartIcon) {
        navCartIcon.addEventListener('click', () => toggleCartModal());
        // Acessibilidade: permitir abrir com Enter
        navCartIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCartModal();
            }
        });
    }

    // Se havia outros botões de carrinho no HTML (removidos), garantir que não existam listeners duplicados
    const floatingCartBtn = document.getElementById('cart-button');
    const openCartBtn = document.getElementById('open-cart');
    if (floatingCartBtn) floatingCartBtn.remove();
    if (openCartBtn) openCartBtn.remove();
});

// Aplicar comportamento a todos os ícones .nav-cart em qualquer página
document.addEventListener('DOMContentLoaded', () => {
    ensureCartModalExists();

    const navCarts = document.querySelectorAll('.nav-cart');
    navCarts.forEach(svg => {
        // evitar duplicar listeners
        svg.removeEventListener('click', toggleCartModal);
        svg.addEventListener('click', () => toggleCartModal());
        svg.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCartModal();
            }
        });
    });

    // Atualizar contadores caso tenham sido injetados
    updateCartDisplay();
    
    // Attach add-to-cart handlers
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.dataset.name || btn.getAttribute('data-name');
            const price = parseFloat(btn.dataset.price || btn.getAttribute('data-price')) || 0;
            addToCart(name, price);

            // feedback visual simples
            btn.textContent = 'Adicionado ✓';
            setTimeout(() => {
                btn.textContent = 'Adicionar ao Carrinho';
            }, 900);
        });
    });
});

// Event delegation: captura cliques em .nav-cart ou #nav-cart-icon de qualquer lugar do document
document.addEventListener('click', (e) => {
    const target = e.target.closest('.nav-cart, #nav-cart-icon');
    if (target) {
        e.stopPropagation();
        toggleCartModal();
    }
});

// Função de checkout - redireciona para WhatsApp com resumo do carrinho
function checkoutCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Montar mensagem de carrinho
    let cartSummary = 'Olá! Gostaria de fazer um pedido:\n\n';
    let total = 0;
    
    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartSummary += `${index + 1}. ${item.name} - Quantidade: ${item.quantity} - R$ ${itemTotal.toFixed(2)}\n`;
    });
    
    cartSummary += `\nTotal: R$ ${total.toFixed(2)}\n\nPor favor, confirme o pedido!`;
    
    // Número de WhatsApp (você pode alterar aqui)
    const phoneNumber = '5511999999999';
    const encodedMessage = encodeURIComponent(cartSummary);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}


// Console log for developers
console.log('🌸 Glamour Joias - Joias Store loaded successfully!');