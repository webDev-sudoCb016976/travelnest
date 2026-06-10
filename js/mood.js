
/* Mood mapping */
const moodMap = {
    adventurous: { type: 'adventure', label: 'Adventure Awaits' },
    relaxed: { type: 'nature', label: 'Time to Unwind'},
    curious: { type: 'cultural', label: 'Feed Your Curiosity' },
    wild: {type: 'nature', label: 'Into the Wild' },
    romantic: {type: 'cultural', label: 'Romance is Calling'}
};

const moodBtns = document.querySelectorAll('.mood-btn');
const moodResults =  document.getElementById( 'mood-results');

moodBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        moodBtns.forEach(function(b) {b.classList.remove('active'); });
        btn.classList.add('active');

        const mood = btn.dataset.mood;
        const mapping = moodMap[mood];
        const matches = destinations.filter(function(d) {
            return d.type === mapping.type;

        });

        moodResults.innerHTML = `<h3>${mapping.label}</h3>
        <div class="mood-cards">
            ${matches.map(function(dest) {
                return `
                <div class="card">
                    <img src="${dest.image}" alt="${dest.name}">
                    <div class="card-body">
                        <div class="card-region">${dest.region} . ${dest.type}</div>
                        <h3>${dest.name}</h3>
                        <p>${dest.description.substring(0, 80)}...</p>
                    </div>
                </div>`;
            }).join('')}
        </div>`;           
    });
        
});