const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function insertFakeData() {
    const dbPath = path.resolve(__dirname, 'database.db');
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        }
    });

    db.serialize(() => {
        db.run(`INSERT INTO Divisions (division_id, division_name) VALUES 
            (1, 'Division A'), 
            (2, 'Division B')`, (err) => {
            if (err) {
                console.error('Error inserting into Divisions:', err.message);
            }
        });

        db.run(`INSERT INTO Teams (team_id, division_id) VALUES 
            (1, 1), 
            (2, 1), 
            (3, 2)`, (err) => {
            if (err) {
                console.error('Error inserting into Teams:', err.message);
            }
        });

        db.run(`INSERT INTO Players (player_id, player_name, team_id) VALUES 
            (1, 'Player 1', 1),
            (2, 'Player 2', 1),
            (3, 'Player 3', 3),
            (4, 'Player 4', 2)`, (err) => {
            if (err) {
                console.error('Error inserting into Players:', err.message);
            }
        });

        db.run(`INSERT INTO BorrowingRules (rule_id, division_id, is_borrowing_allowed) VALUES 
            (1, 1, 1), 
            (2, 2, 1)`, (err) => {
            if (err) {
                console.error('Error inserting into BorrowingRules:', err.message);
            }
        });

        db.run(`INSERT INTO BorrowFromDivision (borrowing_rule_id, division_id) VALUES 
            (1, 1), 
            (2, 2)`, (err) => {
            if (err) {
                console.error('Error inserting into BorrowFromDivision:', err.message);
            }
        });

        console.log('Fake data inserted successfully.');
    });

    db.close((err) => {
        if (err) {
            console.error('Failed to close the database:', err.message);
        } else {
            console.log('Closed the database connection.');
        }
    });
}

module.exports = { insertFakeData };