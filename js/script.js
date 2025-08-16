// ========== Global Variables ==========
let chatbotOpen = false;

// ========== DOM Content Loaded ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize chatbot
    initializeChatbot();
    
    // Initialize form validation if forms exist
    initializeFormValidation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize navigation highlighting
    initializeNavigation();
});

// ========== Mobile Menu Functions ==========
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = navMenu.classList.contains('active') ? 'rotate(45deg)' : 'rotate(0deg)';
            });
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'rotate(0deg)';
                });
            });
        });
    }
}

// ========== Chatbot Functions (Dify) ==========
// Difyチャットボットは自動で初期化されるため、カスタム関数は不要
// 必要に応じてDifyのAPIを使用して制御可能

// ========== Form Validation ==========
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error messages
    removeErrorMessage(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showErrorMessage(field, 'この項目は必須です。');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showErrorMessage(field, '有効なメールアドレスを入力してください。');
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phonePattern = /^[\d\-\(\)\s\+]+$/;
        if (!phonePattern.test(value)) {
            showErrorMessage(field, '有効な電話番号を入力してください。');
            isValid = false;
        }
    }
    
    // Update field styling
    if (isValid) {
        field.style.borderColor = '#4CAF50';
    } else {
        field.style.borderColor = '#f44336';
    }
    
    return isValid;
}

function showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    field.style.borderColor = '#e0e0e0';
}

// ========== Scroll Animations ==========
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.card, .feature-item, .news-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== Navigation Highlighting ==========
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = '#4CAF50';
            link.style.fontWeight = '600';
        }
    });
}

// ========== Utility Functions ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ========== Emergency Contact Functions ==========
function callEmergency() {
    window.location.href = 'tel:0120-XXX-XXX';
}

function showEmergencyInfo() {
    const emergencyModal = document.createElement('div');
    emergencyModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 1002; display: flex; justify-content: center; align-items: center;">
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; text-align: center;">
                <h3 style="color: #f44336; margin-bottom: 1rem;">緊急時の対応</h3>
                <p style="margin-bottom: 1rem;">以下の症状がある場合は、すぐにお電話ください：</p>
                <ul style="text-align: left; margin-bottom: 1rem;">
                    <li>意識がない、ぐったりしている</li>
                    <li>呼吸が苦しそう</li>
                    <li>大量出血している</li>
                    <li>痙攣を起こしている</li>
                    <li>中毒の可能性がある</li>
                </ul>
                <div style="margin-bottom: 1rem;">
                    <strong>緊急連絡先：0120-XXX-XXX</strong>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #4CAF50; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">閉じる</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(emergencyModal);
}

// ========== CSS Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== Form Submission Handler ==========
function handleFormSubmission(formId) {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                // TODO: 実際のフォーム送信処理を実装
                showNotification('お問い合わせありがとうございます。確認後、ご連絡いたします。');
                form.reset();
            }
        });
    }
}

// ========== Page-specific Initializations ==========
// 各ページで必要に応じて呼び出す関数
function initializeHomePage() {
    // ホームページ固有の初期化
    const heroButton = document.querySelector('.hero .btn');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                smoothScrollTo(contactSection);
            }
        });
    }
}

function initializeContactPage() {
    // お問い合わせページの初期化
    handleFormSubmission('contact-form');
}

function initializeServicesPage() {
    // サービスページの初期化
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            showServiceDetails(serviceId);
        });
    });
}

function showServiceDetails(serviceId) {
    // サービス詳細を表示する関数
    // TODO: 実装時に詳細を追加
    console.log('サービス詳細:', serviceId);
}

// ========== Export functions for external use ==========
window.vetHospital = {
    toggleChatbot,
    closeChatbot,
    showNotification,
    callEmergency,
    showEmergencyInfo,
    smoothScrollTo,
    initializeHomePage,
    initializeContactPage,
    initializeServicesPage
};