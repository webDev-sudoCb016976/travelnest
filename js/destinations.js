/* Display destinations */
const grid = document.getElementById('destinations-grid');
function displayDestinations(list) {
    grid.innerHTML = '';
    list.forEach(function(dest) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <div class="card-body">
                <div class="card-region">${dest.region} . ${dest.type}</div>
                <h3>${dest.name}</h3>
                <p>${dest.description.substring(0, 90)}...</p>
                <br>
                <small>${dest.cost} . ${dest.days} days</small>
            </div>
            `;
            grid.appendChild(card);
            card.addEventListener('click', function() {
                openModal(dest);
            });
    });
}
displayDestinations(destinations);

/* Filters */
let activeRegion = 'all';
let activeType = 'all';
function applyFilters() {
    let filtered = destinations;
    if (activeRegion !== 'all') {
        filtered = filtered.filter(function(d) {
            return d.region === activeRegion;
        });
    }
    if (activeType !== 'all') {
        filtered = filtered.filter(function(d) {
            return d.type === activeType;
        });
    }
    displayDestinations(filtered);
}
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(function(btn){
    btn.addEventListener('click', function() {
        const filter = btn.dataset.filter;
        const value = btn.dataset.value;
        document.querySelectorAll(`[data-filter="${filter}"]`).forEach(function(b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        if (filter === 'region') activeRegion = value;
        if (filter === 'type') activeType = value;
        applyFilters();
    });
});

// ── MODAL ──
const overlay = document.createElement('div');
overlay.className = 'modal-overlay';
overlay.innerHTML = `
    <div class="modal">
        <button class="modal-close">×</button>
        <div id="modal-content"></div>
    </div>
`;
document.body.appendChild(overlay);

let currentAudio = null;

function openModal(dest) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    document.getElementById('modal-content').innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:220px; object-fit:cover; margin-bottom:24px;">
        <div class="modal-emoji">${dest.emoji}</div>
        <h2>${dest.name}</h2>
        <div class="modal-region">${dest.region} . ${dest.type} . ${dest.cost}</div>
        <p>${dest.description}</p>
        <div class="modal-attractions">
            <h4>Top Attractions</h4>
            <ul>
                ${dest.attractions.map(a => `<li>${a}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-meta">
            <span>⏱ ${dest.days} days recommended</span>
            <span>💰 ${dest.cost}</span>
        </div>
        <div class="modal-audio">
            <audio controls loop src="${dest.audio}">
                Your browser does not support audio.
            </audio>
        </div>
    `;
    currentAudio = new Audio(dest.audio);
    currentAudio.loop = true;
    currentAudio.volume = 0.4;
    currentAudio.play();
    overlay.classList.add('open');
}

overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
        overlay.classList.remove('open');
    }
});

document.querySelector('.modal-close').addEventListener('click', function() {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    overlay.classList.remove('open');
});