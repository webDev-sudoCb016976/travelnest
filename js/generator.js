/* Generate trip*/
document.getElementById('generate-btn').addEventListener('click', function() {
    const region = document.getElementById('gen-region').value;
    const type = document.getElementById('gen-type').value;
    const cost = document.getElementById('gen-budget').value;

    let filtered = destinations;

    if (region !== 'all') {
        filtered = filtered.filter(function(d) {
            return d.region === region;
        });
    }
    if (type !== 'all') {
        filtered = filtered.filter(function(d) {
            return d.type === type;
        });
    
    } 
    if (cost !== 'all') {
        filtered= filtered.filter(function(d) {
            return d.costLevel === cost;
        });
    }

    const content = document.getElementById('gen-card');

    if (filtered.length === 0) {
        content.innerHTML = '<p> No destinations match your preferences. Try broading your search.</p>';
        return;
    }

    const dest = filtered[Math.floor(Math.random() * filtered.length)];

    content.innerHTML = `
        <div style="text-align:center; margin-bottom: 24px;">
            <div style="font-size: 64px;">${dest.emoji}</div>
        </div>
        <div class="result-item"><span>Destination</span><span>${dest.name}, ${dest.country}</span></div>
        <div class="result-item"><span>Region</span><span>${dest.region}</span></div>
        <div class="result-item"><span>Type</span><span>${dest.type}</span></div>
        <div class="result-item"><span>Duration</span><span>${dest.days}</span></div>
        <div class="result-item"><span>Budget</span><span>${dest.cost}</span></div>
        <div class="result-total"><span>${dest.name}</span></div>
        <p style="font-size:13px; color: var(--text); margin-top: 16px;">${dest.description}</p>

        `;


});
