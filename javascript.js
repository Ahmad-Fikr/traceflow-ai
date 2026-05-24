// =============================================
// TRACEFLOW AI — script.js
// =============================================

// Scroll reveal
const reveals = document.querySelectorAll(
    '.hero-stats, .flow-visual, .metric-card, .feature-card, .pas-grid, .agitation-block, .solution-block, .tier, .quote-block'
);
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// Stagger children within grids
document.querySelectorAll('.metrics-grid, .features-grid, .token-tiers').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
    });
});

// Number counter animation
function animateCounter(el) {
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return;

    const duration = 1200;
    const start = performance.now();
    const prefix = text.match(/^[^0-9]*/)?.[0] || '';
    const suffix = text.match(/[^0-9.]+$/)?.[0] || '';

    function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = (num * eased).toFixed(num % 1 !== 0 ? 1 : 0);
        el.textContent = prefix + current + suffix;
        if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.metric-num').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.metrics-grid').forEach(el => counterObserver.observe(el));

// Sticky header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});