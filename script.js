document.addEventListener('DOMContentLoaded', () => {
    const youtuberForm = document.getElementById('youtuber-form');
    const sponsorForm = document.getElementById('sponsor-form');
    const matchesSection = document.getElementById('matches');

    youtuberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('youtuber-name').value;
        const email = document.getElementById('youtuber-email').value;
        const channel = document.getElementById('youtuber-channel').value;

        fetch('/api/youtubers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, channel })
        })
        .then(response => response.json())
        .then(data => alert('YouTuber registered successfully!'));
    });

    sponsorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sponsor-name').value;
        const email = document.getElementById('sponsor-email').value;
        const product = document.getElementById('sponsor-product').value;

        fetch('/api/sponsors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, product })
        })
        .then(response => response.json())
        .then(data => alert('Sponsor registered successfully!'));
    });

    fetch('/api/matches')
        .then(response => response.json())
        .then(matches => {
            matches.forEach(match => {
                const matchElement = document.createElement('div');
                matchElement.classList.add('p-4', 'border', 'mb-2');
                matchElement.innerHTML = `<strong>${match.youtuber.name}</strong> (Channel: ${match.youtuber.channel}) - <strong>${match.sponsor.product}</strong> by ${match.sponsor.name}`;
                matchesSection.appendChild(matchElement);
            });
        });
});
