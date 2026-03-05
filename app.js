const menus = {
    lunch: [
        { name: '김치찌개', emoji: '🥘' },
        { name: '돈까스', emoji: '🍱' },
        { name: '마라탕', emoji: '🍜' },
        { name: '햄버거', emoji: '🍔' },
        { name: '비빔밥', emoji: '🥗' },
        { name: '제육볶음', emoji: '🍛' },
        { name: '쌀국수', emoji: '🍜' },
        { name: '초밥', emoji: '🍣' },
        { name: '샌드위치', emoji: '🥪' },
        { name: '순대국', emoji: '🍲' }
    ],
    dinner: [
        { name: '치킨', emoji: '🍗' },
        { name: '삼겹살', emoji: '🥓' },
        { name: '피자', emoji: '🍕' },
        { name: '족발', emoji: '🐷' },
        { name: '곱창', emoji: '🔥' },
        { name: '떡볶이', emoji: '🍢' },
        { name: '파스타', emoji: '🍝' },
        { name: '양꼬치', emoji: '🍢' },
        { name: '회', emoji: '🐟' },
        { name: '스테이크', emoji: '🥩' }
    ]
};

let currentCategory = 'lunch';

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabSlider = document.querySelector('.tab-slider');
const recommendBtn = document.getElementById('recommendBtn');
const resultCard = document.getElementById('resultCard');
const resultPlaceholder = resultCard.querySelector('.result-placeholder');
const loadingContainer = document.getElementById('loadingContainer');
const resultContent = document.getElementById('resultContent');
const resultCategory = document.getElementById('resultCategory');
const resultMenu = document.getElementById('resultMenu');
const resultEmoji = document.getElementById('resultEmoji');

// Tab Selection Logic
tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Update active class
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Move slider
        const offset = index * 100;
        tabSlider.style.transform = `translateX(${offset}%)`;
        
        currentCategory = btn.dataset.category;
        
        // Reset card state if category changes
        resetResult();
    });
});

function resetResult() {
    resultPlaceholder.classList.remove('hidden');
    resultContent.classList.add('hidden');
    loadingContainer.classList.add('hidden');
    resultCard.classList.remove('active');
    recommendBtn.textContent = '추천받기!';
}

// Recommend Logic
recommendBtn.addEventListener('click', () => {
    // UI state: Loading
    resultPlaceholder.classList.add('hidden');
    resultContent.classList.add('hidden');
    loadingContainer.classList.remove('hidden');
    resultCard.classList.remove('active');
    
    recommendBtn.disabled = true;
    recommendBtn.textContent = '메뉴 고르는 중...';

    // Artificial delay for better UX
    setTimeout(() => {
        const categoryMenus = menus[currentCategory];
        const randomMenu = categoryMenus[Math.floor(Math.random() * categoryMenus.length)];

        resultCategory.textContent = currentCategory === 'lunch' ? '점심 추천' : '저녁 추천';
        resultMenu.textContent = randomMenu.name;
        resultEmoji.textContent = randomMenu.emoji;

        // UI state: Success
        loadingContainer.classList.add('hidden');
        resultContent.classList.remove('hidden');
        resultCard.classList.add('active');
        
        recommendBtn.disabled = false;
        recommendBtn.textContent = '다른 메뉴 보기';
    }, 800);
});
