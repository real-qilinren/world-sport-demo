const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { initDb } = require('./dbconfig');
const { insertFakeData } = require('./insertFakeData');

async function getBorrowablePlayers(teamId, callback) {
    const dbPath = path.resolve(__dirname, 'database.db');
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database', err.message);
            callback(err);
        }
    });

    const query = `
        SELECT p.player_id, p.player_name
        FROM Players p
                 JOIN Teams t ON p.team_id = t.team_id
                 JOIN Divisions d ON t.division_id = d.division_id
                 JOIN BorrowingRules br ON br.division_id = d.division_id
                 JOIN BorrowFromDivision bfd ON br.rule_id = bfd.borrowing_rule_id
        WHERE br.is_borrowing_allowed = 1
          AND bfd.division_id = t.division_id
          AND t.team_id = ?;
    `;

    db.all(query, [teamId], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err);
        } else {
            callback(null, rows);
        }
    });

    db.close((err) => {
        if (err) {
            console.error('Error closing database', err.message);
        }
    });
}

module.exports = getBorrowablePlayers;
