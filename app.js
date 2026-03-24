const menus = {
    lunch: {
        korean: [{ name: '김치찌개', emoji: '🥘' }, { name: '된장찌개', emoji: '🍲' }, { name: '비빔밥', emoji: '🥗' }, { name: '제육볶음', emoji: '🍛' }, { name: '순대국', emoji: '🍲' }, { name: '칼국수', emoji: '🍜' }, { name: '콩나물국밥', emoji: '🥣' }, { name: '육개장', emoji: '🍲' }, { name: '곰탕', emoji: '🍲' }],
        japanese: [{ name: '돈까스', emoji: '🍱' }, { name: '초밥', emoji: '🍣' }, { name: '우동', emoji: '🍜' }, { name: '라멘', emoji: '🍜' }, { name: '규동', emoji: '🍛' }, { name: '가츠동', emoji: '🍛' }],
        chinese: [{ name: '짜장면', emoji: '🍝' }, { name: '짬뽕', emoji: '🍜' }, { name: '볶음밥', emoji: '🍛' }, { name: '마라탕', emoji: '🍜' }],
        western: [{ name: '햄버거', emoji: '🍔' }, { name: '샌드위치', emoji: '🥪' }, { name: '샐러드', emoji: '🥗' }, { name: '파스타', emoji: '🍝' }],
        others: [{ name: '쌀국수', emoji: '🍜' }, { name: '카레', emoji: '🍛' }, { name: '타코', emoji: '🌮' }]
    },
    dinner: {
        korean: [{ name: '삼겹살', emoji: '🥓' }, { name: '족발', emoji: '🐷' }, { name: '곱창', emoji: '🔥' }, { name: '감자탕', emoji: '🍲' }, { name: '찜닭', emoji: '🍗' }, { name: '보쌈', emoji: '🍱' }, { name: '닭볶음탕', emoji: '🥘' }],
        japanese: [{ name: '회', emoji: '🐟' }, { name: '샤브샤브', emoji: '🍲' }, { name: '스키야키', emoji: '🍲' }, { name: '이자카야 안주', emoji: '🍶' }],
        chinese: [{ name: '탕수육', emoji: '🍗' }, { name: '훠궈', emoji: '🥘' }, { name: '마라상궈', emoji: '🥘' }, { name: '양꼬치', emoji: '🍢' }, { name: '유린기', emoji: '🍗' }],
        western: [{ name: '피자', emoji: '🍕' }, { name: '스테이크', emoji: '🥩' }, { name: '파스타', emoji: '🍝' }, { name: '감바스', emoji: '🍤' }],
        others: [{ name: '똠양꿍', emoji: '🍲' }, { name: '부리또', emoji: '🌯' }, { name: '인도 커리', emoji: '🥘' }]
    },
    lateNight: {
        korean: [{ name: '라면', emoji: '🍜' }, { name: '불닭볶음면', emoji: '🔥' }, { name: '야채곱창', emoji: '🥘' }, { name: '오돌뼈', emoji: '🦴' }, { name: '닭발', emoji: '🐾' }, { name: '김치전', emoji: '🥞' }],
        japanese: [{ name: '타코야끼', emoji: '🐙' }, { name: '오코노미야끼', emoji: '🥞' }],
        chinese: [{ name: '군만두', emoji: '🥟' }, { name: '마라탕', emoji: '🍜' }],
        western: [{ name: '치킨', emoji: '🍗' }, { name: '나초', emoji: '🌮' }, { name: '소시지', emoji: '🌭' }],
        others: [{ name: '떡볶이', emoji: '🍢' }, { name: '튀김', emoji: '🍤' }, { name: '순대', emoji: '🍱' }]
    },
    dessert: [
        { name: '크로플', emoji: '🥐' }, { name: '마카롱', emoji: '🍪' }, { name: '탕후루', emoji: '🍓' }, { name: '케이크', emoji: '🍰' }, { name: '빙수', emoji: '🍧' }, { name: '아이스크림', emoji: '🍦' },
        { name: '푸딩', emoji: '🍮' }, { name: '와플', emoji: '컨셉' }, { name: '쿠키', emoji: '🍪' }, { name: '베이글', emoji: '🥯' }, { name: '에그타르트', emoji: '🥧' }, { name: '약과', emoji: '🍯' },
        { name: '붕어빵', emoji: '🐟' }, { name: '호떡', emoji: '🥞' }
    ]
};

const labelsTime = { lunch: '점심', dinner: '저녁', lateNight: '야식', dessert: '디저트' };
const labelsType = { all: '전체', korean: '한식', japanese: '일식', chinese: '중식', western: '양식', others: '기타' };

const styleActive = ['border-orange-500', 'bg-orange-50', 'text-orange-700', 'shadow-sm'];
const styleInactive = ['border-slate-200', 'bg-white', 'text-slate-700', 'hover:border-orange-500', 'hover:bg-slate-50'];

let currentMain = 'lunch';
let currentSub = 'all';
let foodHistory = JSON.parse(localStorage.getItem('whateatHistory') || '[]');
let bookmarks = JSON.parse(localStorage.getItem('whateatBookmark') || '[]');
let currentListView = 'history';

// --- Initialization ---
function initSelectors() {
    const timeGrid = document.getElementById('time-tabs');
    if (!timeGrid) return;
    timeGrid.innerHTML = '';
    Object.entries(labelsTime).forEach(([key, name]) => {
        const btn = document.createElement('button');
        btn.className = `btn-time p-4 rounded-2xl border-2 transition-all text-center font-bold text-lg outline-none active:scale-95 ${key === currentMain ? styleActive.join(' ') : styleInactive.join(' ')}`;
        btn.innerText = name;
        btn.onclick = () => selectTime(key);
        timeGrid.appendChild(btn);
    });
    renderTypeTabs();
}

function renderTypeTabs() {
    const typeGrid = document.getElementById('type-tabs');
    const typeLabel = document.getElementById('type-section-container');
    if (!typeGrid || !typeLabel) return;
    
    if (currentMain === 'dessert') {
        typeLabel.classList.add('hidden');
        return;
    }
    typeLabel.classList.remove('hidden');
    typeGrid.innerHTML = '';
    
    Object.entries(labelsType).forEach(([key, name]) => {
        const btn = document.createElement('button');
        btn.className = `btn-type p-3 rounded-2xl border-2 transition-all text-center font-bold outline-none active:scale-95 ${key === currentSub ? styleActive.join(' ') : styleInactive.join(' ')}`;
        btn.innerText = name;
        btn.onclick = () => selectType(key);
        typeGrid.appendChild(btn);
    });
}

function selectTime(key) {
    currentMain = key;
    currentSub = 'all';
    initSelectors();
    resetResult();
}

function selectType(key) {
    currentSub = key;
    renderTypeTabs();
    resetResult();
}

function resetResult() {
    document.getElementById('roulette-display').innerText = '클릭해서 뽑기!';
    document.getElementById('result-emoji').classList.add('hidden');
    document.getElementById('action-buttons').classList.add('hidden');
    document.getElementById('result-tags').innerHTML = '';
    const drawBtn = document.getElementById('draw-btn');
    drawBtn.disabled = false;
    drawBtn.innerText = '오늘의 메뉴 뽑기';
}

// --- Roulette System ---
document.getElementById('draw-btn').addEventListener('click', () => {
    let pool = [];
    if (currentMain === 'dessert') {
        pool = menus.dessert;
    } else {
        const d = menus[currentMain];
        pool = currentSub === 'all' ? Object.values(d).flat() : d[currentSub];
    }
    
    if(!pool.length) return;
    
    const display = document.getElementById('roulette-display');
    const emoji = document.getElementById('result-emoji');
    const btn = document.getElementById('draw-btn');
    
    btn.disabled = true;
    btn.innerText = '열심히 고르는 중...';
    document.getElementById('action-buttons').classList.add('hidden');
    emoji.classList.add('hidden');
    document.getElementById('result-tags').innerHTML = '';
    display.classList.add('shuffling');
    
    let count = 0;
    const interval = setInterval(() => {
        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        display.innerText = randomItem.name;
        count++;
        
        if (count > 15) {
            clearInterval(interval);
            display.classList.remove('shuffling');
            btn.disabled = false;
            btn.innerText = '다른 메뉴 추천받기 🎲';
            display.innerText = randomItem.name;
            emoji.innerText = randomItem.emoji;
            emoji.classList.remove('hidden');
            document.getElementById('action-buttons').classList.remove('hidden');
            showTags();
            checkBookmarkBtnStatus(randomItem.name);
            saveHistory(randomItem);
        }
    }, 80);
});

function showTags() {
    const container = document.getElementById('result-tags');
    container.innerHTML = `<span class="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-100">${labelsTime[currentMain]}</span>`;
    if(currentMain !== 'dessert') {
        container.innerHTML += `<span class="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100">${labelsType[currentSub]}</span>`;
    }
}

// --- Action Buttons ---
document.getElementById('naver-search-btn').addEventListener('click', () => {
    const term = document.getElementById('roulette-display').innerText;
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(term + ' 맛집')}`, '_blank');
});

function checkBookmarkBtnStatus(name) {
    const isBookmarked = bookmarks.some(b => b.name === name);
    const btn = document.getElementById('bookmark-btn');
    if(isBookmarked) {
        btn.classList.add('bg-orange-100', 'text-orange-700', 'border-orange-200');
        btn.innerText = '북마크 저장됨 🧡';
    } else {
        btn.classList.remove('bg-orange-100', 'text-orange-700', 'border-orange-200');
        btn.innerText = '즐겨찾기 추가 🤍';
    }
}

document.getElementById('bookmark-btn').addEventListener('click', () => {
    const name = document.getElementById('roulette-display').innerText;
    const emoji = document.getElementById('result-emoji').innerText;
    const idx = bookmarks.findIndex(b => b.name === name);
    if(idx > -1) bookmarks.splice(idx, 1);
    else bookmarks.unshift({ name, emoji });
    localStorage.setItem('whateatBookmark', JSON.stringify(bookmarks));
    checkBookmarkBtnStatus(name);
});

// --- Modal & History ---
function saveHistory(item) {
    if(foodHistory.length >= 20) foodHistory.pop();
    const dateStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    foodHistory.unshift({ ...item, date: dateStr });
    localStorage.setItem('whateatHistory', JSON.stringify(foodHistory));
}

function openModal(type) {
    document.getElementById('clear-list-btn').classList.remove('hidden');
    currentListView = type;
    document.getElementById('modal-title').innerText = type === 'history' ? '🕒 최근 뽑은 내역' : '⭐ 내 북마크';
    renderModalList();
    const modal = document.getElementById('list-modal');
    const box = document.getElementById('modal-box');
    modal.classList.remove('hidden');
    setTimeout(() => {
        box.classList.remove('scale-95', 'opacity-0');
        box.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('list-modal');
    const box = document.getElementById('modal-box');
    box.classList.remove('scale-100', 'opacity-100');
    box.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
}

function renderModalList() {
    const list = document.getElementById('modal-list');
    const data = currentListView === 'history' ? foodHistory : bookmarks;
    list.innerHTML = '';
    if(data.length === 0) {
        list.innerHTML = '<li class="text-center py-8 text-slate-400 text-sm">기록이 비어있습니다.</li>';
        return;
    }
    data.forEach(item => {
        const li = document.createElement('li');
        li.className = 'w-full p-4 bg-white rounded-2xl mb-2 flex items-center justify-between shadow-sm border border-slate-100 cursor-pointer hover:border-indigo-300 transition-all';
        li.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">${item.emoji}</span>
                <span class="font-bold text-slate-800">${item.name}</span>
            </div>
            ${item.date ? `<span class="text-xs text-slate-400 font-medium">${item.date}</span>` : `<span class="text-xs font-bold text-orange-500">검색🔍</span>`}
        `;
        li.onclick = () => window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(item.name + ' 맛집')}`, '_blank');
        list.appendChild(li);
    });
}

document.getElementById('close-modal-btn').onclick = closeModal;
document.getElementById('list-modal').onclick = (e) => { if(e.target.id === 'list-modal') closeModal(); };
document.getElementById('clear-list-btn').onclick = () => {
    if(confirm('기록을 전부 삭제하시겠습니까?')) {
        if(currentListView === 'history') { foodHistory = []; localStorage.removeItem('whateatHistory'); }
        else { bookmarks = []; localStorage.removeItem('whateatBookmark'); checkBookmarkBtnStatus(document.getElementById('roulette-display').innerText); }
        renderModalList();
    }
};

// --- Carousel Architecture ---
let currentColumnIndex = 0;
let columnData = [];
let autoPlayInterval;

async function loadColumns() {
    const list = document.getElementById('column-list');
    const dotsContainer = document.getElementById('carousel-dots');
    try {
        const response = await fetch('data/columns.json');
        if (!response.ok) throw new Error('Failed to load columns');
        columnData = await response.json();
        if (!columnData.length) return;

        list.innerHTML = '';
        dotsContainer.innerHTML = '';

        columnData.forEach((col, index) => {
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="flex items-center space-x-2 mb-4">
                    <span class="magazine-tag uppercase">MAGAZINE</span>
                    <span class="text-slate-400 text-[10px] font-medium">${col.date}</span>
                </div>
                <h3 class="text-2xl md:text-3xl font-extrabold mb-4 text-slate-900 leading-tight">${col.title}</h3>
                <p class="text-slate-600 text-sm md:text-base leading-loose line-clamp-3 mb-6">${col.content}</p>
                <div class="mt-auto">
                    <span class="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">칼럼 전체 읽기 <i class="fa-solid fa-arrow-right-long ml-2"></i></span>
                </div>
            `;
            article.onclick = () => {
                stopAutoPlay();
                openColumnDetail(col);
                startAutoPlay();
            };
            list.appendChild(article);

            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = (e) => {
                e.stopPropagation();
                goToColumn(index);
            };
            dotsContainer.appendChild(dot);
        });

        startAutoPlay();
    } catch (error) { console.error("Could not load columns:", error); }
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextColumn, 5000);
}

function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
}

function updateCarousel() {
    const list = document.getElementById('column-list');
    const dots = document.querySelectorAll('.dot');
    if (!list) return;
    list.style.transform = `translateX(-${currentColumnIndex * 100}%)`;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentColumnIndex);
    });
}

function nextColumn() {
    if (!columnData.length) return;
    currentColumnIndex = (currentColumnIndex + 1) % columnData.length;
    updateCarousel();
}

function goToColumn(index) {
    currentColumnIndex = index;
    updateCarousel();
    startAutoPlay();
}

function openColumnDetail(col) {
    const modal = document.getElementById('list-modal');
    const title = document.getElementById('modal-title');
    const list = document.getElementById('modal-list');
    const clearBtn = document.getElementById('clear-list-btn');
    title.innerText = "📖 푸드 매거진";
    clearBtn.classList.add('hidden');
    list.innerHTML = `<div class="p-6 space-y-4 text-left">
        <p class="text-[10px] font-bold text-indigo-500 uppercase">${col.date} 발행</p>
        <h2 class="text-2xl font-black text-slate-900 leading-tight">${col.title}</h2>
        <div class="h-1 w-12 bg-indigo-500 rounded-full"></div>
        <p class="text-slate-600 text-base leading-loose whitespace-pre-wrap">${col.content}</p>
    </div>`;
    modal.classList.remove('hidden');
    document.getElementById('modal-box').classList.remove('scale-95', 'opacity-0');
    document.getElementById('modal-box').classList.add('scale-100', 'opacity-100', 'max-w-md');
}

// Top Nav Buttons
document.getElementById('view-history-btn-top').onclick = () => openModal('history');
document.getElementById('view-bookmark-btn-top').onclick = () => openModal('bookmark');

// run!
initSelectors();
loadColumns();

// PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js'); });
}