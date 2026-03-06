const menus = {
    lunch: {
        korean: [
            { name: '김치찌개', emoji: '🥘' }, { name: '된장찌개', emoji: '🍲' }, { name: '비빔밥', emoji: '🥗' },
            { name: '제육볶음', emoji: '🍛' }, { name: '순대국', emoji: '🍲' }, { name: '칼국수', emoji: '🍜' },
            { name: '콩나물국밥', emoji: '🥣' }, { name: '육개장', emoji: '🍲' }, { name: '곰탕', emoji: '🍲' }
        ],
        japanese: [
            { name: '돈까스', emoji: '🍱' }, { name: '초밥', emoji: '🍣' }, { name: '우동', emoji: '🍜' },
            { name: '라멘', emoji: '🍜' }, { name: '규동', emoji: '🍛' }, { name: '가츠동', emoji: '🍛' }
        ],
        chinese: [
            { name: '짜장면', emoji: '🍝' }, { name: '짬뽕', emoji: '🍜' }, { name: '볶음밥', emoji: '🍛' },
            { name: '마라탕', emoji: '🍜' }
        ],
        western: [
            { name: '햄버거', emoji: '🍔' }, { name: '샌드위치', emoji: '🥪' }, { name: '샐러드', emoji: '🥗' },
            { name: '파스타', emoji: '🍝' }
        ],
        others: [
            { name: '쌀국수', emoji: '🍜' }, { name: '카레', emoji: '🍛' }, { name: '타코', emoji: '🌮' }
        ]
    },
    dinner: {
        korean: [
            { name: '삼겹살', emoji: '🥓' }, { name: '족발', emoji: '🐷' }, { name: '곱창', emoji: '🔥' },
            { name: '감자탕', emoji: '🍲' }, { name: '찜닭', emoji: '🍗' }, { name: '보쌈', emoji: '🍱' },
            { name: '닭볶음탕', emoji: '🥘' }
        ],
        japanese: [
            { name: '회', emoji: '🐟' }, { name: '샤브샤브', emoji: '🍲' }, { name: '스키야키', emoji: '🍲' },
            { name: '이자카야 안주', emoji: '🍶' }
        ],
        chinese: [
            { name: '탕수육', emoji: '🍗' }, { name: '훠궈', emoji: '🥘' }, { name: '마라상궈', emoji: '🥘' },
            { name: '양꼬치', emoji: '🍢' }, { name: '유린기', emoji: '🍗' }
        ],
        western: [
            { name: '피자', emoji: '🍕' }, { name: '스테이크', emoji: '🥩' }, { name: '파스타', emoji: '🍝' },
            { name: '감바스', emoji: '🍤' }
        ],
        others: [
            { name: '똠양꿍', emoji: '🍲' }, { name: '부리또', emoji: '🌯' }, { name: '인도 커리', emoji: '🥘' }
        ]
    },
    lateNight: {
        korean: [
            { name: '라면', emoji: '🍜' }, { name: '불닭볶음면', emoji: '🔥' }, { name: '야채곱창', emoji: '🥘' },
            { name: '오돌뼈', emoji: '🦴' }, { name: '닭발', emoji: '🐾' }, { name: '김치전', emoji: '🥞' }
        ],
        japanese: [
            { name: '타코야끼', emoji: '🐙' }, { name: '오코노미야끼', emoji: '🥞' }
        ],
        chinese: [
            { name: '군만두', emoji: '🥟' }, { name: '마라탕', emoji: '🍜' }
        ],
        western: [
            { name: '치킨', emoji: '🍗' }, { name: '나초', emoji: '🌮' }, { name: '소시지', emoji: '🌭' }
        ],
        others: [
            { name: '떡볶이', emoji: '🍢' }, { name: '튀김', emoji: '🍤' }, { name: '순대', emoji: '🍱' }
        ]
    },
    dessert: [
        { name: '크로플', emoji: '🥐' }, { name: '마카롱', emoji: '🍪' }, { name: '탕후루', emoji: '🍓' },
        { name: '케이크', emoji: '🍰' }, { name: '빙수', emoji: '🍧' }, { name: '아이스크림', emoji: '🍦' },
        { name: '푸딩', emoji: '🍮' }, { name: '와플', emoji: '🧇' }, { name: '쿠키', emoji: '🍪' },
        { name: '베이글', emoji: '🥯' }, { name: '에그타르트', emoji: '🥧' }, { name: '약과', emoji: '🍯' },
        { name: '붕어빵', emoji: '🐟' }, { name: '호떡', emoji: '🥞' }
    ]
};

// --- DOM Elements ---
const mainTabBtns = document.querySelectorAll('.main-tabs .tab-btn');
const subTabsContainer = document.getElementById('subTabs');
const subTabBtns = document.querySelectorAll('.sub-tab-btn');
const tabSlider = document.querySelector('.tab-slider');
const recommendBtn = document.getElementById('recommendBtn');
const resultCard = document.getElementById('resultCard');
const resultPlaceholder = resultCard.querySelector('.result-placeholder');
const loadingContainer = document.getElementById('loadingContainer');
const resultContent = document.getElementById('resultContent');
const resultMainTag = document.getElementById('resultMainTag');
const resultSubTag = document.getElementById('resultSubTag');
const resultMenu = document.getElementById('resultMenu');
const resultEmoji = document.getElementById('resultEmoji');
const naverSearchBtn = document.getElementById('naverSearchBtn');
const bookmarkBtn = document.getElementById('bookmarkBtn');
const historyList = document.getElementById('historyList');
const bookmarkList = document.getElementById('bookmarkList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// --- State ---
let currentMain = 'lunch';
let currentSub = 'all';
let foodHistory = JSON.parse(localStorage.getItem('foodHistory') || '[]');
let bookmarks = JSON.parse(localStorage.getItem('foodBookmarks') || '[]');

// --- Global Functions (Explicitly attached to window for HTML inline calls) ---
window.openNaver = function(name) {
    const query = encodeURIComponent(name + ' 맛집');
    window.open(`https://search.naver.com/search.naver?query=${query}`, '_blank');
};

window.toggleBookmark = function(name, emoji) {
    const index = bookmarks.findIndex(b => b.name === name);
    if (index > -1) {
        bookmarks.splice(index, 1);
        if (resultMenu.textContent === name) bookmarkBtn.textContent = '🤍';
    } else {
        bookmarks.push({ name, emoji });
        if (resultMenu.textContent === name) bookmarkBtn.textContent = '❤️';
    }
    localStorage.setItem('foodBookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
};

// --- Helper Functions ---
function renderHistory() {
    historyList.innerHTML = '';
    if (foodHistory.length === 0) {
        historyList.innerHTML = '<li style="text-align:center; color:#adb5bd; font-size:0.85rem; padding:15px;">아직 추천 기록이 없습니다.</li>';
        clearHistoryBtn.style.display = 'none';
        return;
    }
    clearHistoryBtn.style.display = 'block';
    foodHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span class="menu-info">${item.emoji} ${item.name}</span>
            <span class="date-info">${item.date}</span>
        `;
        li.onclick = () => window.openNaver(item.name);
        historyList.appendChild(li);
    });
}

function renderBookmarks() {
    bookmarkList.innerHTML = '';
    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = '<li style="text-align:center; color:#adb5bd; font-size:0.85rem; padding:15px;">좋아하는 메뉴를 저장해 보세요!</li>';
        return;
    }
    bookmarks.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span class="menu-info">${item.emoji} ${item.name}</span>
            <span class="delete-bookmark" onclick="event.stopPropagation(); window.toggleBookmark('${item.name}', '${item.emoji}')">제거</span>
        `;
        li.onclick = () => window.openNaver(item.name);
        bookmarkList.appendChild(li);
    });
}

function saveToHistory(name, emoji) {
    const now = new Date();
    const dateStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    foodHistory.unshift({ name, emoji, date: dateStr });
    if (foodHistory.length > 5) foodHistory.pop();
    localStorage.setItem('foodHistory', JSON.stringify(foodHistory));
    renderHistory();
}

function resetResult() {
    resultPlaceholder.classList.remove('hidden');
    resultContent.classList.add('hidden');
    loadingContainer.classList.add('hidden');
    resultCard.classList.remove('active');
    recommendBtn.textContent = '메뉴 추천받기!';
    recommendBtn.disabled = false;
}

// --- Event Listeners ---
mainTabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        mainTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabSlider.style.transform = `translateX(${index * 100}%)`;
        currentMain = btn.dataset.category;
        
        if (currentMain === 'dessert') {
            subTabsContainer.style.display = 'none';
        } else {
            subTabsContainer.style.display = 'flex';
        }
        
        resetResult();
    });
});

subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        subTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSub = btn.dataset.sub;
        resetResult();
    });
});

const mainLabels = { lunch: '점심 추천', dinner: '저녁 추천', lateNight: '야식 추천', dessert: '디저트 추천' };
const subLabels = { korean: '한식', japanese: '일식', chinese: '중식', western: '양식', others: '기타', all: '전체' };

recommendBtn.addEventListener('click', () => {
    resultPlaceholder.classList.add('hidden');
    resultContent.classList.add('hidden');
    loadingContainer.classList.remove('hidden');
    resultCard.classList.remove('active');
    recommendBtn.disabled = true;
    recommendBtn.textContent = '메뉴 고르는 중...';

    setTimeout(() => {
        let pool = [];
        let finalSubLabel = '';

        if (currentMain === 'dessert') {
            pool = menus.dessert;
            finalSubLabel = '달콤한 디저트';
        } else {
            const mainData = menus[currentMain];
            if (currentSub === 'all') {
                pool = Object.values(mainData).flat();
                finalSubLabel = '다양한 장르';
            } else {
                pool = mainData[currentSub];
                finalSubLabel = subLabels[currentSub];
            }
        }

        if (!pool || pool.length === 0) {
            alert('해당 카테고리에 메뉴가 없습니다.');
            resetResult();
            return;
        }

        const randomMenu = pool[Math.floor(Math.random() * pool.length)];

        resultMainTag.textContent = mainLabels[currentMain];
        resultSubTag.textContent = finalSubLabel;
        resultMenu.textContent = randomMenu.name;
        resultEmoji.textContent = randomMenu.emoji;
        
        // 북마크 상태 확인
        const isBookmarked = bookmarks.some(b => b.name === randomMenu.name);
        bookmarkBtn.textContent = isBookmarked ? '❤️' : '🤍';
        
        naverSearchBtn.href = `https://search.naver.com/search.naver?query=${encodeURIComponent(randomMenu.name + ' 맛집')}`;

        saveToHistory(randomMenu.name, randomMenu.emoji);

        loadingContainer.classList.add('hidden');
        resultContent.classList.remove('hidden');
        resultCard.classList.add('active');
        recommendBtn.disabled = false;
        recommendBtn.textContent = '다른 메뉴 보기';
    }, 800);
});

bookmarkBtn.addEventListener('click', () => {
    window.toggleBookmark(resultMenu.textContent, resultEmoji.textContent);
});

clearHistoryBtn.addEventListener('click', () => {
    if (confirm('모든 추천 기록을 삭제할까요?')) {
        foodHistory = [];
        localStorage.removeItem('foodHistory');
        renderHistory();
    }
});

// --- Initial Setup ---
renderHistory();
renderBookmarks();
