let currentCategory = '전체';
let columnData = [];
let currentColumnIndex = 0;
let rotationInterval = null;
let history = JSON.parse(localStorage.getItem('foodHistory') || '[]');

const foodData = {
    '한식': ['비빔밥', '김치찌개', '제육볶음', '순대국', '불고기', '냉면', '삼겹살', '국밥', '닭갈비', '된장찌개'],
    '중식': ['짜장면', '짬뽕', '볶음밥', '탕수육', '마파두부', '양장피', '유산슬', '멘보샤'],
    '일식': ['초밥', '라멘', '돈카츠', '규동', '우동', '소바', '가츠동', '텐동', '사케동'],
    '양식': ['파스타', '피자', '햄버거', '스테이크', '리조또', '샌드위치', '오므라이스', '감바스']
};

document.addEventListener('DOMContentLoaded', () => {
    loadColumns();
    // Default category fallback
    const firstCat = document.querySelector('.cat-btn');
    if (firstCat) selectCategory('한식', firstCat);
});

function selectCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('border-orange-500', 'bg-orange-50', 'text-orange-600');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-900');
    });
    btn.classList.add('border-orange-500', 'bg-orange-50', 'text-orange-600');
    document.getElementById('result-display').innerText = `${cat} 중에서 골라볼까요?`;
    document.getElementById('result-display').classList.remove('text-slate-300');
    document.getElementById('result-display').classList.add('text-slate-800');
}

function runRoulette() {
    const display = document.getElementById('result-display');
    const btn = document.getElementById('main-btn');
    const pool = currentCategory === '전체' ? Object.values(foodData).flat() : foodData[currentCategory];

    btn.disabled = true;
    let count = 0;
    const timer = setInterval(() => {
        display.innerText = pool[Math.floor(Math.random() * pool.length)];
        count++;
        if (count > 25) {
            clearInterval(timer);
            const finalMenu = display.innerText;
            display.innerHTML = `<span class="text-orange-500 mr-2 uppercase">Today:</span> <span class="text-slate-900 font-black">${finalMenu}</span>`;
            saveToHistory(finalMenu, currentCategory);
            btn.disabled = false;
        }
    }, 50);
}

function saveToHistory(menu, category) {
    const item = { menu, category, date: new Date().toLocaleTimeString() };
    history.unshift(item);
    if (history.length > 20) history.pop();
    localStorage.setItem('foodHistory', JSON.stringify(history));
}

// Column Logic
async function loadColumns() {
    try {
        const response = await fetch('data/columns.json');
        if (!response.ok) throw new Error('Failed to load columns');
        columnData = await response.json();
        if (columnData.length > 0) {
            renderCard(0);
            startRotation();
        }
    } catch (error) {
        console.error("Could not load columns:", error);
    }
}

function renderCard(index) {
    const content = document.getElementById('slider-content');
    const data = columnData[index];
    if (!data) return;

    content.innerHTML = `
        <article onclick="openColumnModal(${index})" class="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all slide-in cursor-pointer">
            <h3 class="font-bold text-slate-800 text-sm sm:text-base mb-2">${data.title}</h3>
            <p class="text-xs text-slate-500 leading-relaxed line-clamp-3">${data.content}</p>
            <div class="mt-4 flex items-center justify-between">
                <span class="text-[10px] text-slate-400 font-medium italic">AI 분석 • ${index + 1}/${columnData.length}</span>
                <span class="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Read More</span>
            </div>
        </article>
    `;
}

function startRotation() {
    if (rotationInterval) clearInterval(rotationInterval);
    rotationInterval = setInterval(() => {
        currentColumnIndex = (currentColumnIndex + 1) % columnData.length;
        renderCard(currentColumnIndex);
    }, 5000);
}

function openColumnModal(index) {
    const col = columnData[index];
    document.getElementById('modal-title').innerText = col.title;
    document.getElementById('modal-content').innerText = col.content;
    document.getElementById('modal-date').innerText = col.date || 'AI Magazine';
    
    const modal = document.getElementById('column-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('column-modal-box').classList.remove('scale-95', 'opacity-0');
        document.getElementById('column-modal-box').classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeColumnModal() {
    const modal = document.getElementById('column-modal');
    document.getElementById('column-modal-box').classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// History Modal
function openHistoryModal() {
    const list = document.getElementById('history-list');
    list.innerHTML = history.map(item => `
        <div class="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
                <p class="text-sm font-bold text-slate-900">${item.menu}</p>
                <p class="text-[10px] text-slate-400">${item.category} • ${item.date}</p>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>
    `).join('') || '<p class="text-center py-10 text-slate-400 text-sm italic">추천 기록이 없습니다.</p>';

    const modal = document.getElementById('history-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('history-modal-box').classList.remove('scale-95', 'opacity-0');
        document.getElementById('history-modal-box').classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeHistoryModal() {
    document.getElementById('history-modal-box').classList.add('scale-95', 'opacity-0');
    setTimeout(() => document.getElementById('history-modal').classList.add('hidden'), 300);
}

function clearHistory() {
    history = [];
    localStorage.removeItem('foodHistory');
    openHistoryModal();
}