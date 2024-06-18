const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let youtubers = [];
let sponsors = [];

app.post('/api/youtubers', (req, res) => {
    const youtuber = req.body;
    youtubers.push(youtuber);
    updateMatches();
    res.json({ message: 'YouTuber registered successfully!' });
});

app.post('/api/sponsors', (req, res) => {
    const sponsor = req.body;
    sponsors.push(sponsor);
    updateMatches();
    res.json({ message: 'Sponsor registered successfully!' });
});

app.get('/api/matches', (req, res) => {
    const matches = createMatches();
    res.json(matches);
});

function updateMatches() {
    const matches = createMatches();
    fs.writeFileSync(path.join(__dirname, 'sponsors.json'), JSON.stringify(matches, null, 2));
}

function createMatches() {
    const matches = [];
    youtubers.forEach(youtuber => {
        sponsors.forEach(sponsor => {
            matches.push({ youtuber, sponsor });
        });
    });
    return matches;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
