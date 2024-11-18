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



// 유틸리티 함수들
const utils = {
    // 예시 함수
    formatDate: (date) => {
        return date.toLocaleDateString();
    }
};
