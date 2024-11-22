// 엄격 모드 선언
'use strict';

// DOM이 로드된 후 실행되는 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 여기에 초기화 코드 작성
    init();
});

// 초기화 함수
function init() {
    initCarousel();
    initSlidingText();
    initScrollAnimation();
    initNavigation();
    initAuthForms();
    initComnotice();
    initFooter();
}

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = 0;

    // 이미지 전환 함수
    function showImage(index, direction = 'next') {
        const currentItem = carousel.querySelector('.carousel-item.active');
        const newItem = items[index];
        
        // 현재 활성 아이템에서 active 클래스 제거
        currentItem.classList.remove('active');
        
        // 새 아이템 초기 위치 설정
        if (direction === 'next') {
            newItem.style.transform = 'translateX(100%)';
        } else {
            newItem.style.transform = 'translateX(-100%)';
        }
        
        // 강제 리플로우
        newItem.offsetHeight;
        
        // 트랜지션 적용
        requestAnimationFrame(() => {
            // 현재 아이템 이동
            if (direction === 'next') {
                currentItem.style.transform = 'translateX(-100%)';
            } else {
                currentItem.style.transform = 'translateX(100%)';
            }
            
            // 새 아이템을 현재 위치로
            newItem.classList.add('active');
            newItem.style.transform = 'translateX(0)';
        });
        
        // dots 업데이트
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // 다음 이미지로 이동
    function nextImage() {
        const nextIndex = (currentIndex + 1) % items.length;
        showImage(nextIndex, 'next');
        currentIndex = nextIndex;
    }

    // 이전 이미지로 이동
    function prevImage() {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        showImage(prevIndex, 'prev');
        currentIndex = prevIndex;
    }

    // 이벤트 리스너 등록
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // dot 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });
}

function initSlidingText() {
    const slidingText = document.querySelector('.sliding-text');
    const textWidth = slidingText.offsetWidth;
    const containerWidth = document.querySelector('.slogan-container').offsetWidth;
    
    // 컨테이너를 채우기 위해 필요한 만큼 span 요소 복제
    const spans = slidingText.querySelectorAll('span');
    const spansNeeded = Math.ceil((containerWidth * 2) / textWidth);
    
    // 이미 2개의 span이 있으므로, 필요한 만큼만 추가
    for (let i = 2; i < spansNeeded; i++) {
        const clone = spans[0].cloneNode(true);
        slidingText.appendChild(clone);
    }
}

function initScrollAnimation() {
    const blocks = document.querySelectorAll('.content-block, .content2-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    blocks.forEach(block => {
        observer.observe(block);
    });
}

// 네비게이션 메뉴 관련 기능 추가
function initNavigation() {
    const navItems = document.querySelectorAll('.square-has-submenu');
    
    // 모바일 디바이스 체크
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (this.querySelector('.square-sub-search')) {
                    e.preventDefault();
                    this.querySelector('.square-sub-search').classList.toggle('show-mobile');
                }
            });
        });
    }
    
    // 스크롤 시 헤더 스타일 변경
    let lastScroll = 0;
    const header = document.querySelector('.square-header-container');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 80) {
            // 스크롤 다운
            header.style.transform = 'translateY(-100%)';
        } else {
            // 스크롤 업
            header.style.transform = 'translateY(0)';
        }
        
        // 스크롤 위치에 따른 헤더 스타일
        if (currentScroll > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// 유틸리티 함수들
const utils = {
    // 예시 함수
    formatDate: (date) => {
        return date.toLocaleDateString();
    }
};

// 로그인/회원가입 폼 초기화
function initAuthForms() {
    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-register');
    const loginPane = document.getElementById('pills-login');
    const registerPane = document.getElementById('pills-register');

    // 탭 전환 이벤트
    loginTab.addEventListener('click', (e) => {
        e.preventDefault();
        showPane(loginPane, registerPane);
        setActiveTab(loginTab, registerTab);
    });

    registerTab.addEventListener('click', (e) => {
        e.preventDefault();
        showPane(registerPane, loginPane);
        setActiveTab(registerTab, loginTab);
    });

    // 폼 제출 이벤트
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // 입력 필드 포커스 이벤
    const inputs = document.querySelectorAll('.form-outline input');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });
}

function showPane(showElement, hideElement) {
    hideElement.classList.remove('show', 'active');
    showElement.classList.add('show', 'active');
}

function setActiveTab(activeTab, inactiveTab) {
    inactiveTab.classList.remove('active');
    activeTab.classList.add('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    // TODO: 실제 폼 제출 로직 구현
    console.log('Form submitted:', e.target.id);
}

function handleInputFocus(e) {
    e.target.closest('.form-outline').classList.add('focused');
}

function handleInputBlur(e) {
    if (!e.target.value) {
        e.target.closest('.form-outline').classList.remove('focused');
    }
}

// 공지사항 섹션 초기화 함수
function initComnotice() {
    const comnoticeItems = document.querySelectorAll('.comnotice-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 순차적으로 나타나는 애니메이션 효과
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    comnoticeItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        observer.observe(item);
    });
}

// Footer 초기화 함수
function initFooter() {
    // 스크롤 시 footer 페이드인 효과
    const footer = document.querySelector('.square-footer-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'all 0.5s ease';
    
    observer.observe(footer);
}
