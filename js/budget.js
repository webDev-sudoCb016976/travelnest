/* Popolate destination dropdown */
const select =  document.getElementById('budget-destination');

destinations.forEach(function(dest){
    const option = document.createElement('option');
    option.value = dest.id;
    option.textContent = `${dest.name}, ${dest.country}`;
    select.appendChild(option);
});

/* Calculate budget */
document.getElementById('calculate-btn').addEventListener ('click', function() {
    const destId = parseInt(select.value);
    const dest = destinations.find(function(d) {return d.id === destId; }); 
    const travellers = parseInt(document.getElementById('travellers').value) || 1;
    const hotel = parseFloat(document.getElementById('hotel').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const activities = parseFloat(document.getElementById('activities').value) || 0;
    const flight = parseFloat(document.getElementById('flight').value) || 0;

    if (!dest) {alert('Please select a destination.'); return}
    
    const days = dest.days;
    const hotelTotal = hotel * days * travellers;
    const foodTotal = food * days * travellers;
    const flightTotal = flight * travellers;
    const total = hotelTotal + foodTotal + activities + flightTotal;

    document.getElementById('results-content').innerHTML = `
        <div class="result-item"><span>Destination</span><span>${dest.name}, ${dest.country}</span></div>
        <div class="result-item"><span>Duration</span><span>${days} days</span></div>
        <div class="result-item"><span>Travellers</span><span>${travellers}</span></div>
        <div class="result-item"><span>Hotel (${days} nights)</span><span>$${hotelTotal}</span></div>
        <div class="result-item"><span>Food (${days} days)</span><span>$${foodTotal}</span></div>
        <div class="result-item"><span>Activities</span><span>$${activities}</span></div>
        <div class="result-item"><span>Flights</span><span>$${flightTotal}</span></div>
        <div class="result-total"><span>Total</span><span>$${total}</span></div>

    `;

});