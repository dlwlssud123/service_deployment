const menus = {
    korean: [
        { name: '김치찌개', emoji: '🥘' },
        { name: '된장찌개', emoji: '🍲' },
        { name: '비빔밥', emoji: '🥗' },
        { name: '제육볶음', emoji: '🍛' },
        { name: '순대국', emoji: '🍲' },
        { name: '칼국수', emoji: '🍜' },
        { name: '냉면', emoji: '🧊' },
        { name: '고기국수', emoji: '🍜' },
        { name: '콩나물국밥', emoji: '🥣' },
        { name: '육회비빔밥', emoji: '🥗' },
        { name: '부대찌개', emoji: '🥘' },
        { name: '육개장', emoji: '🍲' },
        { name: '소고기무국', emoji: '🥣' },
        { name: '곰탕', emoji: '🍲' },
        { name: '삼겹살', emoji: '🥓' },
        { name: '족발', emoji: '🐷' },
        { name: '곱창', emoji: '🔥' },
        { name: '감자탕', emoji: '🍲' },
        { name: '찜닭', emoji: '🍗' },
        { name: '닭볶음탕', emoji: '🥘' },
        { name: '보쌈', emoji: '🍱' },
        { name: '아구찜', emoji: '🐡' },
        { name: '장어구이', emoji: '🐍' },
        { name: '소곱창전골', emoji: '🥘' },
        { name: '쪽갈비', emoji: '🍖' },
        { name: '김치전', emoji: '🥞' },
        { name: '해물파전', emoji: '🥞' },
        { name: '추어탕', emoji: '🍲' }
    ],
    japanese: [
        { name: '초밥', emoji: '🍣' },
        { name: '돈까스', emoji: '🍱' },
        { name: '텐동', emoji: '🍤' },
        { name: '우동', emoji: '🍜' },
        { name: '라멘', emoji: '🍜' },
        { name: '모밀', emoji: '🍜' },
        { name: '규동', emoji: '🍛' },
        { name: '가츠동', emoji: '🍛' },
        { name: '타코야끼', emoji: '🐙' },
        { name: '회덮밥', emoji: '🥗' },
        { name: '오코노미야끼', emoji: '🥞' },
        { name: '나베', emoji: '🍲' }
    ],
    chinese: [
        { name: '짜장면', emoji: '🍝' },
        { name: '짬뽕', emoji: '🍜' },
        { name: '탕수육', emoji: '🍗' },
        { name: '마라탕', emoji: '🍜' },
        { name: '훠궈', emoji: '🥘' },
        { name: '마라상궈', emoji: '🥘' },
        { name: '양꼬치', emoji: '🍢' },
        { name: '딤섬', emoji: '🥟' },
        { name: '볶음밥', emoji: '🍛' },
        { name: '유린기', emoji: '🍗' },
        { name: '깐풍기', emoji: '🍗' },
        { name: '마파두부', emoji: '🥘' }
    ],
    western: [
        { name: '피자', emoji: '🍕' },
        { name: '파스타', emoji: '🍝' },
        { name: '스테이크', emoji: '🥩' },
        { name: '햄버거', emoji: '🍔' },
        { name: '치킨', emoji: '🍗' },
        { name: '샌드위치', emoji: '🥪' },
        { name: '샐러드', emoji: '🥗' },
        { name: '리조또', emoji: '🍛' },
        { name: '감바스', emoji: '🍤' },
        { name: '부리또', emoji: '🌯' },
        { name: '타코', emoji: '🌮' }
    ],
    snacks: [
        { name: '떡볶이', emoji: '🍢' },
        { name: '튀김', emoji: '🍤' },
        { name: '순대', emoji: '🍱' },
        { name: '라면', emoji: '🍜' },
        { name: '불닭볶음면', emoji: '🔥' },
        { name: '김밥', emoji: '🍙' },
        { name: '오돌뼈', emoji: '🦴' },
        { name: '닭발', emoji: '🐾' },
        { name: '골뱅이소면', emoji: '🐚' },
        { name: '먹태', emoji: '🐟' },
        { name: '콘치즈', emoji: '🌽' },
        { name: '소시지', emoji: '🌭' }
    ],
    dessert: [
        { name: '크로플', emoji: '🥐' },
        { name: '마카롱', emoji: '🍪' },
        { name: '탕후루', emoji: '🍓' },
        { name: '케이크', emoji: '🍰' },
        { name: '빙수', emoji: '🍧' },
        { name: '아이스크림', emoji: '🍦' },
        { name: '푸딩', emoji: '🍮' },
        { name: '와플', emoji: '🧇' },
        { name: '쿠키', emoji: '🍪' },
        { name: '베이글', emoji: '🥯' },
        { name: '에그타르트', emoji: '🥧' },
        { name: '약과', emoji: '🍯' },
        { name: '붕어빵', emoji: '🐟' },
        { name: '호떡', emoji: '🥞' }
    ]
};

let currentCategory = 'korean';

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
const naverSearchBtn = document.getElementById('naverSearchBtn');

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

// Category Name Mapping
const categoryNames = {
    korean: '추천 한식',
    japanese: '추천 일식',
    chinese: '추천 중식',
    western: '추천 양식',
    snacks: '추천 분식/야식',
    dessert: '추천 디저트'
};

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

        resultCategory.textContent = categoryNames[currentCategory];
        resultMenu.textContent = randomMenu.name;
        resultEmoji.textContent = randomMenu.emoji;
        
        // Update Naver Search Link
        naverSearchBtn.href = `https://search.naver.com/search.naver?query=${encodeURIComponent(randomMenu.name + ' 맛집')}`;

        // UI state: Success
        loadingContainer.classList.add('hidden');
        resultContent.classList.remove('hidden');
        resultCard.classList.add('active');
        
        recommendBtn.disabled = false;
        recommendBtn.textContent = '다른 메뉴 보기';
    }, 800);
});
