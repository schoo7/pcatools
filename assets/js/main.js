// Modern Interactive Features for Prostate Cancer Research Hub

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollAnimations();
    initSmoothScrolling();
    initToolCardInteractions();
    initDynamicTooltips();
    initCopyToClipboard();
    initLoadingAnimations();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all tool cards and feature items
    document.querySelectorAll('.tool-card, .feature-item, .badge').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Enhanced tool card interactions
function initToolCardInteractions() {
    document.querySelectorAll('.tool-card').forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = e.clientX - this.offsetLeft + 'px';
            ripple.style.top = e.clientY - this.offsetTop + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });

        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Dynamic tooltips for better UX
function initDynamicTooltips() {
    const tooltipData = {
        'HuPSA-MoPSA': 'Single-cell RNA-seq atlas for human and mouse prostate cancer',
        'CTPC': 'Comprehensive prostate cancer cell line encyclopedia',
        'LNCaP-ADT Hub': 'Multi-omics analysis of androgen deprivation therapy resistance',
        'PCTA': 'Pan-cancer cell line transcriptome atlas',
        'IMPACT-sc': 'Integrated single-cell analysis pipeline',
        'SRA-LLM': 'Smart research assistant powered by LLM'
    };

    document.querySelectorAll('.tool-title').forEach(title => {
        const toolName = title.textContent.split(':')[0].trim();
        if (tooltipData[toolName]) {
            title.setAttribute('title', tooltipData[toolName]);
            title.style.cursor = 'help';
        }
    });
}

// Copy to clipboard functionality for URLs
function initCopyToClipboard() {
    document.querySelectorAll('.tool-url').forEach(urlElement => {
        urlElement.style.cursor = 'pointer';
        urlElement.title = 'Click to open in new tab';
        
        // Remove any existing click listeners
        urlElement.removeEventListener('click', function() {});
        
        // Let the link work normally - open in new tab via target="_blank"
    });
}

// Loading animations for better perceived performance
function initLoadingAnimations() {
    // Add loading skeleton for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.6s ease-out';
        });
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = document.getElementById('toolSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('toolSearch');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            filterTools('');
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS dynamically for new elements
const additionalCSS = `
.search-container {
    margin: 2rem 0;
    position: relative;
}

#toolSearch {
    width: 100%;
    max-width: 500px;
    padding: 1rem 1.5rem;
    border: 2px solid var(--neutral-200);
    border-radius: 2rem;
    font-size: 1rem;
    font-family: var(--font-family-primary);
    transition: all 0.3s ease;
    background: white;
    box-shadow: var(--shadow-md);
}

#toolSearch:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.notification {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--accent-green);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-xl);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
}

.notification.show {
    transform: translateY(0);
    opacity: 1;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);