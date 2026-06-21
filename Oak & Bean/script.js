document.addEventListener('DOMContentLoaded', () => {
    initLiveStatus();
    initReviewCarousel();
    initNewsletterForm();
    initMenuFilter();
    initBasketSystem();
    initContactForm();
});

function initLiveStatus() {
    const statusBadge = document.getElementById('open-status');
    if (!statusBadge) return;

    const now = new Date();
    const day = now.getDay(); 
    const timeInMins = (now.getHours() * 60) + now.getMinutes();
    let isOpen = false;

    if (day >= 1 && day <= 5 && timeInMins >= 450 && timeInMins < 1050) isOpen = true;
    else if (day === 6 && timeInMins >= 480 && timeInMins < 1080) isOpen = true;
    else if (day === 0 && timeInMins >= 540 && timeInMins < 960) isOpen = true;

    if (isOpen) {
        statusBadge.textContent = 'Open Now';
        statusBadge.className = 'status-badge status-open';
    } else {
        statusBadge.textContent = 'Closed';
        statusBadge.className = 'status-badge status-closed';
    }
}

function initReviewCarousel() {
    const reviews = document.querySelectorAll('.review-card');
    const prev = document.getElementById('prev-review');
    const next = document.getElementById('next-review');
    let idx = 0;

    if (!reviews.length || !prev || !next) return;

    next.addEventListener('click', () => {
        reviews[idx].classList.remove('active');
        idx = (idx + 1) % reviews.length;
        reviews[idx].classList.add('active');
    });

    prev.addEventListener('click', () => {
        reviews[idx].classList.remove('active');
        idx = (idx - 1 + reviews.length) % reviews.length;
        reviews[idx].classList.add('active');
    });
}

function initMenuFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.menu-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (target === 'all' || card.getAttribute('data-category') === target) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

let basket = [];
function initBasketSystem() {
    const items = document.querySelectorAll('.orderable-item');
    const container = document.getElementById('basket-items');
    const totalDisplay = document.getElementById('basket-cost');
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('order-modal');
    const closeModal = document.querySelectorAll('.close-modal, #modal-close-btn');

    if (!items.length || !container) return;

    items.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('span:first-child').textContent;
            const price = parseFloat(item.querySelector('span:last-child').textContent.replace('£', ''));
            basket.push({ name, price });
            updateBasketUI();
        });
    });

    function updateBasketUI() {
        container.innerHTML = '';
        if (basket.length === 0) {
            container.innerHTML = '<p class="empty-message">Your basket is empty.</p>';
            totalDisplay.textContent = '£0.00';
            return;
        }

        let total = 0;
        basket.forEach(item => {
            total += item.price;
            const row = document.createElement('div');
            row.className = 'basket-item';
            row.innerHTML = `<span>${item.name}</span><span>£${item.price.toFixed(2)}</span>`;
            container.appendChild(row);
        });
        totalDisplay.textContent = `£${total.toFixed(2)}`;
    }

    checkoutBtn.addEventListener('click', () => {
        if (basket.length > 0) {
            modal.style.display = 'block';
            basket = [];
            updateBasketUI();
        }
    });

    closeModal.forEach(el => {
        el.addEventListener('click', () => modal.style.display = 'none');
    });
}

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const output = document.getElementById('form-message');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        output.textContent = "Successfully joined! Enjoy 10% off your next checkout.";
        output.className = "form-message form-success";
        form.reset();
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const output = document.getElementById('contact-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        output.textContent = "Message sent successfully! Our team will get back to you shortly.";
        output.className = "form-message form-success";
        form.reset();
    });
}