
/* Hamburger Menu */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function(){
    navLinks.classList.toggle('open');
});

/* Auto rotating quotes */
const quotes = [
    {text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine"},
    {text: "Not all those who wander are lost", author: "J.R.R Tolkien"},
    {text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller"},
    {text: "Adventure is worthwhile in itself", author: "Amelia Earhart"},
    {text: "To travel is to live.", author: "Hans Christian Andersen" }
];

let currentQuote = 0;
const quoteEl = document.getElementById('quote');

function rotateQuote() {
    quoteEl.style.opacity = '0';
    setTimeout(function(){
        currentQuote = (currentQuote + 1) % quotes.length;
        quoteEl.innerHTML = `"${quotes[currentQuote].text}" <br><small>- ${quotes[currentQuote].author}</small>`;
        quoteEl.style.opacity = '1';
    }, 500);
}

quoteEl.innerHTML = `"${quotes[0].text}" <br><small>- ${quotes[0].author}</small>`;
quoteEl.style.transition = 'opacity 0.5s';
setInterval(rotateQuote, 4000);

/* Destination of the day */
const dotdCard = document.getElementById('dotd-card');

function loadDotD() {
    const today = new Date().getDate();
    const index = today % destinations.length;
    const dest = destinations[index];

    dotdCard.innerHTML = `
        <div class="dotd-emoji">${dest.emoji}</div>
        <div>
            <h3>${dest.name}, ${dest.country}</h3>
            <p>${dest.description}</p>
            <br>
            <a href="destinations.html" class="btn">Explore More</a>
        </div>
    `;

}

loadDotD();

/* Featured cards */
const featuredGrid = document.getElementById('featured-grid');
const featured = destinations.slice(0, 3);

featured.forEach(function(dest) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}">
        <div class="card-body">
            <div class="card-region">${dest.region}</div>
            <h3>${dest.name}</h3>
            <p>${dest.description.substring(0, 80)}...</p>
        </div>
    
    `;
    featuredGrid.appendChild(card);
});

/* Newsletter */
const newsletterBtn = document.getElementById('newsletter-btn');
const newsletterInput = document.getElementById('newsletter-input');

newsletterBtn.addEventListener('click', function() {
    const email = newsletterInput.value.trim();
    if (email && email.includes('@')) {
        localStorage.setItem('newsletter-email', email);
        newsletterInput.value = '';
        alert('Thank you for subscribing!');

    }
    else
    {
        alert('Please enter a valid email address.');

    }


});