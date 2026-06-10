
/* Load exisiting feedback */
function loadFeedback() {
    const list = document.getElementById('feedback-list');
    const saved = JSON.parse(localStorage.getItem('feedback') || '[]');

    if (saved.length === 0) {
        list.innerHTML = '<p style="font-size:13px; color:var(--text)">No messages yet.</p>';
        return;
    }

    list.innerHTML = saved.map(function(item) {
        return `
        <div class="feedback-item">
            <strong>${item.name} - ${item.subject}</strong>
            <p>${item.message}</p>
            <small>${item.date}</small>
        </div>`;
    }).join('');
}

loadFeedback();

/* Submit feedback*/
document.getElementById('feedback-btn').addEventListener('click', function() {
    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const subject = document.getElementById('feedback-subject').value;
    const message = document.getElementById('feedback-message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.')
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const saved = JSON.parse(localStorage.getItem('feedback') || '[]');
    saved.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleDateString()

    });

    localStorage.setItem('feedback', JSON.stringify(saved));

    document.getElementById('feedback-name').value = '';
    document.getElementById('feedback-email').value = '';
    document.getElementById('feedback-subject').value = '';
    document.getElementById('feedback-message').value = '';

    alert('Thank you for your message!');
    loadFeedback();

});