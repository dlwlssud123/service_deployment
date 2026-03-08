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

const categoryLabels = {
    lunch: '점심',
    dinner: '저녁',
    lateNight: '야식',
    dessert: '디저트'
};

const subCategoryLabels = {
    all: '전체',
    korean: '한식',
    japanese: '일식',
    chinese: '중식',
    western: '양식',
    others: '기타'
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

const historyBtn = document.getElementById('recommendHistoryBtn');
const bookmarkListBtn = document.getElementById('bookmarkListBtn');
const listOverlay = document.getElementById('listOverlay');
const listTitle = document.getElementById('listTitle');
const displayList = document.getElementById('displayList');
const closeListBtn = document.getElementById('closeListBtn');
const clearBtn = document.getElementById('clearBtn');

// --- State ---
let currentMain = 'lunch';
let currentSub = 'all';
let currentListView = 'history';

let foodHistory = JSON.parse(localStorage.getItem('foodHistory') || '[]');
let bookmarks = JSON.parse(localStorage.getItem('foodBookmarks') || '[]');

// --- Functions ---
function updateStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function openNaver(name) {
    const query = encodeURIComponent(name + ' 맛집');
    window.open(`https://search.naver.com/search.naver?query=${query}`, '_blank');
}

function renderList() {
    displayList.innerHTML = '';
    const data = currentListView === 'history' ? foodHistory : bookmarks;
    
    if (data.length === 0) {
        displayList.innerHTML = `<li style="text-align:center; padding:40px; color:#adb5bd;">기록이 없습니다.</li>`;
        return;
    }

    data.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span>${item.emoji} ${item.name}</span>
            <small style="color:#adb5bd; font-size:0.7rem;">${item.date || ''}</small>
        `;
        li.onclick = () => openNaver(item.name);
        displayList.appendChild(li);
    });
}

function toggleList(view) {
    currentListView = view;
    listTitle.textContent = view === 'history' ? '🕒 최근 추천 히스토리' : '⭐ 즐겨찾는 북마크';
    renderList();
    listOverlay.classList.remove('hidden');
}

function updateBookmarkBtn(isBookmarked) {
    bookmarkBtn.textContent = isBookmarked ? '❤️' : '🤍';
    bookmarkBtn.classList.toggle('active', isBookmarked);
}

function toggleBookmark(name, emoji) {
    const index = bookmarks.findIndex(b => b.name === name);
    if (index > -1) {
        bookmarks.splice(index, 1);
        updateBookmarkBtn(false);
    } else {
        if (bookmarks.length >= 20) bookmarks.pop();
        bookmarks.unshift({ name, emoji, date: '북마크됨' });
        updateBookmarkBtn(true);
    }
    updateStorage('foodBookmarks', bookmarks);
}

function resetResult() {
    resultPlaceholder.classList.remove('hidden');
    resultContent.classList.add('hidden');
    loadingContainer.classList.add('hidden');
    resultCard.classList.remove('active');
    recommendBtn.textContent = '메뉴 추천받기!';
    recommendBtn.disabled = false;
}

// --- Events ---
mainTabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        mainTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabSlider.style.transform = `translateX(${index * 100}%)`;
        currentMain = btn.dataset.category;
        subTabsContainer.classList.toggle('hidden', currentMain === 'dessert');
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

recommendBtn.addEventListener('click', () => {
    let pool = [];
    if (currentMain === 'dessert') {
        pool = menus.dessert;
    } else {
        const mainData = menus[currentMain];
        pool = currentSub === 'all' ? Object.values(mainData).flat() : mainData[currentSub];
    }
    if (!pool || pool.length === 0) return;

    resultPlaceholder.classList.add('hidden');
    resultContent.classList.remove('hidden');
    resultCard.classList.add('active');
    recommendBtn.disabled = true;
    recommendBtn.textContent = '고르는 중...';

    naverSearchBtn.style.visibility = 'hidden';
    bookmarkBtn.style.visibility = 'hidden';
    resultEmoji.style.visibility = 'hidden';
    resultMenu.classList.add('shuffling');

    let shuffleCount = 0;
    const maxShuffle = 12;

    const shuffleInterval = setInterval(() => {
        const tempMenu = pool[Math.floor(Math.random() * pool.length)];
        resultMenu.textContent = tempMenu.name;
        shuffleCount++;

        if (shuffleCount >= maxShuffle) {
            clearInterval(shuffleInterval);
            
            const randomMenu = pool[Math.floor(Math.random() * pool.length)];
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            resultMenu.textContent = randomMenu.name;
            resultEmoji.textContent = randomMenu.emoji;
            resultMainTag.textContent = categoryLabels[currentMain];
            resultSubTag.textContent = currentMain === 'dessert' ? '디저트' : subCategoryLabels[currentSub];

            const isBookmarked = bookmarks.some(b => b.name === randomMenu.name);
            updateBookmarkBtn(isBookmarked);
            naverSearchBtn.href = `https://search.naver.com/search.naver?query=${encodeURIComponent(randomMenu.name + ' 맛집')}`;

            foodHistory.unshift({ name: randomMenu.name, emoji: randomMenu.emoji, date: timeStr });
            if (foodHistory.length > 20) foodHistory.pop();
            updateStorage('foodHistory', foodHistory);

            resultMenu.classList.remove('shuffling');
            resultEmoji.style.visibility = 'visible';
            bookmarkBtn.style.visibility = 'visible';
            naverSearchBtn.style.visibility = 'visible';
            
            recommendBtn.disabled = false;
            recommendBtn.textContent = '다른 메뉴 보기';
        }
    }, 100);
});

bookmarkBtn.addEventListener('click', () => {
    toggleBookmark(resultMenu.textContent, resultEmoji.textContent);
});

historyBtn.addEventListener('click', () => toggleList('history'));
bookmarkListBtn.addEventListener('click', () => toggleList('bookmark'));
closeListBtn.addEventListener('click', () => listOverlay.classList.add('hidden'));

clearBtn.addEventListener('click', () => {
    if (confirm('전체 삭제하시겠습니까?')) {
        if (currentListView === 'history') {
            foodHistory = [];
            updateStorage('foodHistory', []);
        } else {
            bookmarks = [];
            updateStorage('foodBookmarks', []);
            updateBookmarkBtn(false);
        }
        renderList();
    }
});

window.onclick = (event) => {
    if (event.target == listOverlay) listOverlay.classList.add('hidden');
};