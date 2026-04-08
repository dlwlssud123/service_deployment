let currentCategory = '전체';
let currentTime = '전체 시간';
let columnData = [];
let currentColumnIndex = 0;
let rotationInterval = null;
let history = JSON.parse(localStorage.getItem('foodHistory') || '[]');

// Expanded Menu Data (120+ items)
const menuData = [
    // 한식 (분식 포함)
    { name: '비빔밥', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '김치찌개', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '제육볶음', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '된장찌개', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '불고기', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '삼겹살', categories: ['한식'], times: ['저녁', '야식'] },
    { name: '갈비탕', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '설렁탕', categories: ['한식'], times: ['아침', '점심', '저녁'] },
    { name: '순두부찌개', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '육개장', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '닭갈비', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '보쌈', categories: ['한식'], times: ['저녁', '야식'] },
    { name: '족발', categories: ['한식'], times: ['저녁', '야식'] },
    { name: '찜닭', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '아구찜', categories: ['한식'], times: ['저녁', '야식'] },
    { name: '감자탕', categories: ['한식'], times: ['점심', '저녁', '야식'] },
    { name: '순대국', categories: ['한식'], times: ['아침', '점심', '저녁', '야식'] },
    { name: '곰탕', categories: ['한식'], times: ['아침', '점심', '저녁'] },
    { name: '청국장', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '콩나물국밥', categories: ['한식'], times: ['아침', '점심', '저녁'] },
    { name: '비빔냉면', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '물냉면', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '칼국수', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '수제비', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '잔치국수', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '비빔국수', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '콩국수', categories: ['한식'], times: ['점심'] },
    { name: '떡볶이', categories: ['한식'], times: ['점심', '간식', '저녁', '야식'] },
    { name: '김밥', categories: ['한식'], times: ['아침', '점심', '간식'] },
    { name: '순대', categories: ['한식'], times: ['간식', '저녁', '야식'] },
    { name: '튀김', categories: ['한식'], times: ['간식', '야식'] },
    { name: '어묵', categories: ['한식'], times: ['아침', '간식', '야식'] },
    { name: '라면', categories: ['한식'], times: ['아침', '간식', '야식'] },
    { name: '쫄면', categories: ['한식'], times: ['점심', '간식'] },
    { name: '파전', categories: ['한식'], times: ['저녁', '야식'] },
    { name: '김치전', categories: ['한식'], times: ['저녁', '야식'] },
    { name: '계란찜', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '잡채', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '떡만두국', categories: ['한식'], times: ['아침', '점심', '저녁'] },
    { name: '미역국', categories: ['한식'], times: ['아침', '점심', '저녁'] },
    { name: '북어국', categories: ['한식'], times: ['아침', '점심', '저녁'] },
    { name: '고등어조림', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '갈치조림', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '오징어볶음', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '낙지볶음', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '제육덮밥', categories: ['한식'], times: ['점심', '저녁'] },
    { name: '김치볶음밥', categories: ['한식'], times: ['아침', '점심', '저녁'] },

    // 중식
    { name: '짜장면', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '짬뽕', categories: ['중식'], times: ['점심', '저녁', '야식'] },
    { name: '볶음밥', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '탕수육', categories: ['중식'], times: ['점심', '저녁', '야식'] },
    { name: '간짜장', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '우동(중식)', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '울면', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '마파두부', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '양장피', categories: ['중식'], times: ['저녁', '야식'] },
    { name: '유산슬', categories: ['중식'], times: ['저녁', '야식'] },
    { name: '팔보채', categories: ['중식'], times: ['저녁', '야식'] },
    { name: '고추잡채', categories: ['중식'], times: ['저녁', '야식'] },
    { name: '멘보샤', categories: ['중식'], times: ['간식', '저녁', '야식'] },
    { name: '꿔바로우', categories: ['중식'], times: ['점심', '저녁', '야식'] },
    { name: '마라탕', categories: ['중식'], times: ['점심', '저녁', '야식'] },
    { name: '마라상궈', categories: ['중식'], times: ['저녁', '야식'] },
    { name: '딤섬', categories: ['중식'], times: ['점심', '간식'] },
    { name: '군만두', categories: ['중식'], times: ['간식', '야식'] },
    { name: '물만두', categories: ['중식'], times: ['아침', '간식'] },
    { name: '짜장밥', categories: ['중식'], times: ['점심', '저녁'] },
    { name: '짬뽕밥', categories: ['중식'], times: ['점심', '저녁'] },

    // 일식
    { name: '초밥', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '라멘', categories: ['일식'], times: ['점심', '저녁', '야식'] },
    { name: '돈카츠', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '규동', categories: ['일식'], times: ['아침', '점심', '저녁'] },
    { name: '우동', categories: ['일식'], times: ['아침', '점심', '저녁', '야식'] },
    { name: '소바', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '가츠동', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '텐동', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '사케동', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '야끼소바', categories: ['일식'], times: ['점심', '저녁', '야식'] },
    { name: '오코노미야끼', categories: ['일식'], times: ['저녁', '야식'] },
    { name: '타코야끼', categories: ['일식'], times: ['간식', '야식'] },
    { name: '회덮밥', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '가츠카레', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '냉모밀', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '에비동', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '나베', categories: ['일식'], times: ['저녁', '야식'] },
    { name: '샤브샤브(일식)', categories: ['일식'], times: ['점심', '저녁'] },
    { name: '장어덮밥', categories: ['일식'], times: ['점심', '저녁'] },

    // 양식
    { name: '돈까스', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '함박스테이크', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '알리오올리오', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '까르보나라', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '토마토파스타', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '로제파스타', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '봉골레', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '스테이크', categories: ['양식'], times: ['저녁'] },
    { name: '피자', categories: ['양식'], times: ['점심', '저녁', '야식'] },
    { name: '햄버거', categories: ['양식'], times: ['점심', '저녁', '야식'] },
    { name: '샌드위치', categories: ['양식'], times: ['아침', '점심', '간식'] },
    { name: '오므라이스', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '그라탕', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '리조또', categories: ['양식'], times: ['점심', '저녁'] },
    { name: '샐러드', categories: ['양식'], times: ['아침', '점심', '간식'] },
    { name: '에그베네딕트', categories: ['양식'], times: ['아침'] },
    { name: '프렌치토스트', categories: ['양식'], times: ['아침', '간식'] },
    { name: '감바스', categories: ['양식'], times: ['저녁', '야식'] },
    { name: '라자냐', categories: ['양식'], times: ['점심', '저녁'] },

    // 기타 (해외식 등)
    { name: '쌀국수', categories: ['기타'], times: ['아침', '점심', '저녁'] },
    { name: '분짜', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '팟타이', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '나시고랭', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '미고랭', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '타코', categories: ['기타'], times: ['점심', '간식', '저녁', '야식'] },
    { name: '브리또', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '퀘사디아', categories: ['기타'], times: ['간식', '저녁', '야식'] },
    { name: '인도커리', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '탄두리치킨', categories: ['기타'], times: ['저녁', '야식'] },
    { name: '똠양꿍', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '푸팟퐁커리', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '월남쌈', categories: ['기타'], times: ['점심', '저녁'] },
    { name: '훠궈', categories: ['기타'], times: ['저녁', '야식'] },

    // 디저트
    { name: '조각케이크', categories: ['디저트'], times: ['간식'] },
    { name: '마카롱', categories: ['디저트'], times: ['간식'] },
    { name: '크로플', categories: ['디저트'], times: ['간식'] },
    { name: '빙수', categories: ['디저트'], times: ['간식', '야식'] },
    { name: '에그타르트', categories: ['디저트'], times: ['간식'] },
    { name: '와플', categories: ['디저트'], times: ['간식'] },
    { name: '도넛', categories: ['디저트'], times: ['아침', '간식'] },
    { name: '쿠키', categories: ['디저트'], times: ['간식'] },
    { name: '아이스크림', categories: ['디저트'], times: ['간식', '야식'] },
    { name: '크레페', categories: ['디저트'], times: ['간식'] },
    { name: '붕어빵', categories: ['디저트'], times: ['간식', '야식'] },
    { name: '호떡', categories: ['디저트'], times: ['간식', '야식'] },
    { name: '츄러스', categories: ['디저트'], times: ['간식'] }
];

document.addEventListener('DOMContentLoaded', () => {
    loadColumns();
    
    // Default fallback selection (Using '전체 시간' as default for broader range)
    const defaultTimeBtn = Array.from(document.querySelectorAll('.time-btn')).find(b => b.innerText === '전체 시간');
    if (defaultTimeBtn) selectTime('전체 시간', defaultTimeBtn);
    
    const defaultCatBtn = Array.from(document.querySelectorAll('.cat-btn')).find(b => b.innerText === '전체');
    if (defaultCatBtn) selectCategory('전체', defaultCatBtn);
});

function selectTime(time, btn) {
    currentTime = time;
    document.querySelectorAll('.time-btn').forEach(b => {
        b.classList.remove('border-orange-500', 'bg-orange-50', 'text-orange-600');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-900');
    });
    btn.classList.add('border-orange-500', 'bg-orange-50', 'text-orange-600');
    updateDisplayText(currentTime, currentCategory);
}

function selectCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('border-orange-500', 'bg-orange-50', 'text-orange-600');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-900');
    });
    btn.classList.add('border-orange-500', 'bg-orange-50', 'text-orange-600');
    updateDisplayText(currentTime, cat);
}

function updateDisplayText(time, cat) {
    const display = document.getElementById('result-display');
    const timeText = time === '전체 시간' ? '언제든 좋은' : time;
    if (cat === '전체') {
        display.innerText = `오늘 ${timeText} 메뉴로 무엇이 좋을까요?`;
    } else {
        display.innerText = `${timeText} 전문 미식가가 추천하는 ${cat} 어때요? 😋`;
    }
    display.classList.remove('text-slate-300');
    display.classList.add('text-slate-800');
}

function runRoulette() {
    const display = document.getElementById('result-display');
    const btn = document.getElementById('main-btn');
    document.getElementById('result-share').classList.add('hidden');

    // Filtering logic
    let pool = menuData.filter(item => {
        const timeMatch = (currentTime === '전체 시간') || item.times.includes(currentTime);
        const catMatch = (currentCategory === '전체') || item.categories.includes(currentCategory);
        return timeMatch && catMatch;
    }).map(item => item.name);

    if (pool.length === 0) {
        display.innerText = "조건에 맞는 메뉴가 없어요 😢";
        return;
    }

    // Randomness improvement: Avoid showing same item too often
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    btn.disabled = true;
    let count = 0;
    const timer = setInterval(() => {
        display.innerText = pool[Math.floor(Math.random() * pool.length)];
        count++;
        if (count > 25) {
            clearInterval(timer);
            const finalMenu = display.innerText;
            const timeLabel = currentTime === '전체 시간' ? '추천' : currentTime;
            const naverUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(finalMenu + ' 맛집')}`;
            
            display.innerHTML = `
                <div class="flex flex-col items-center space-y-4 animate-fade">
                    <div class="text-xl sm:text-3xl">
                        <span class="text-orange-500 mr-2 uppercase font-bold">${timeLabel} 추천:</span> 
                        <a href="${naverUrl}" target="_blank" class="text-slate-900 font-black hover:text-orange-500 underline decoration-slate-200 underline-offset-4 decoration-2 transition-colors">
                            ${finalMenu}
                        </a>
                    </div>
                    <div class="pt-2">
                        <a href="${naverUrl}" target="_blank" class="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#03C75A] text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-md">
                            <span class="text-[10px] bg-white text-[#03C75A] w-4 h-4 rounded-sm flex items-center justify-center">N</span>
                            <span>네이버에서 맛집 찾기</span>
                        </a>
                    </div>
                </div>`;
            
            saveToHistory(finalMenu, `${currentTime} ${currentCategory}`);
            setupResultUI(finalMenu);
            btn.disabled = false;
        }
    }, 50);
}

function setupResultUI(menu) {
    console.log("Setting up Naver Search UI for:", menu);
    const naverBtn = document.getElementById('naver-search-btn');
    const shareSection = document.getElementById('result-share');
    
    if (naverBtn) {
        const query = encodeURIComponent(menu + ' 맛집');
        const url = `https://search.naver.com/search.naver?query=${query}`;
        
        naverBtn.onclick = (e) => {
            e.preventDefault();
            window.open(url, '_blank');
        };
        naverBtn.href = url;
    }
    
    if (shareSection) {
        shareSection.classList.remove('hidden');
        shareSection.style.display = 'block'; // Direct style override for robustness
    } else {
        console.error("Critical Error: 'result-share' element not found in DOM!");
    }
}

function saveToHistory(menu, category) {
    const item = { menu, category, date: new Date().toLocaleTimeString() };
    history.unshift(item);
    if (history.length > 20) history.pop();
    localStorage.setItem('foodHistory', JSON.stringify(history));
}

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
        <a href="column.html?id=${data.id}" class="block">
            <article class="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all slide-in cursor-pointer">
                <h3 class="font-bold text-slate-800 text-sm sm:text-base mb-2">${data.title}</h3>
                <p class="text-xs text-slate-500 leading-relaxed line-clamp-3">${data.content.replace(/[#*`_~]/g, '').trim()}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-[10px] text-slate-400 font-medium italic">AI 분석 • ${index + 1}/${columnData.length}</span>
                    <span class="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Read More</span>
                </div>
            </article>
        </a>
    `;
}

function startRotation() {
    if (rotationInterval) clearInterval(rotationInterval);
    rotationInterval = setInterval(() => {
        currentColumnIndex = (currentColumnIndex + 1) % columnData.length;
        renderCard(currentColumnIndex);
    }, 5000);
}

function shareResult(type) {
    const display = document.getElementById('result-display');
    const fullText = display.innerText;
    const menuName = fullText.split(':').pop()?.trim() || fullText.split('추천:').pop()?.trim() || fullText;
    const shareText = `오늘 메뉴는? ${menuName}! #whattoeat #식사추천`;
    const shareUrl = "https://whattoeat.shop";

    if (type === 'copy') {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            const msg = document.getElementById('share-copy-msg');
            if (msg) {
                msg.classList.remove('opacity-0');
                setTimeout(() => msg.classList.add('opacity-0'), 2000);
            }
        });
        return;
    }

    // Modern Share for Mobile (X, Instagram, KakaoTalk all work via native share)
    if (navigator.share) {
        if (type === 'instagram' || type === 'native') {
            navigator.share({
                title: 'whattoeat.shop 추천',
                text: shareText,
                url: shareUrl
            }).catch(() => {
                if (type === 'instagram') shareResult('copy');
            });
            return;
        }
    }

    let url = '';
    if (type === 'x') {
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (type === 'kakao') {
        url = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}`;
    } else if (type === 'instagram') {
        shareResult('copy');
        return;
    }

    if (url) {
        const win = window.open(url, '_blank', 'width=600,height=400');
        if (!win) {
            // Popup blocked, fallback to direct location or copy
            alert("팝업이 차단되었습니다. 공유 링크를 복사합니다.");
            shareResult('copy');
        }
    }
}

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
        const box = document.getElementById('history-modal-box');
        if (box) {
            box.classList.remove('scale-95', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
}

function closeHistoryModal() {
    const box = document.getElementById('history-modal-box');
    if (box) box.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        const modal = document.getElementById('history-modal');
        if (modal) modal.classList.add('hidden');
    }, 300);
}

function clearHistory() {
    history = [];
    localStorage.removeItem('foodHistory');
    openHistoryModal();
}