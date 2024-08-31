const express = require('express');
const getBorrowablePlayers = require('./getBorrowablePlayers');
const { initDb } = require('./dbconfig');
const { insertFakeData } = require('./insertFakeData');

const app = express();
const PORT = 3000;

// initDb();
// insertFakeData();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    const teamId = 1; // Team ID for which we want to fetch borrowable players
    getBorrowablePlayers(teamId, (err, players) => {
        if (err) {
            console.error('Error fetching players:', err);
        } else {
            console.log(`Borrowable players for team ${teamId}:`, players);
        }
    });
});