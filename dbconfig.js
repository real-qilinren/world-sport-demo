// dbconfig.js
const sqlite3 = require('sqlite3').verbose();

function initDb() {
    const db = new sqlite3.Database('database.db');

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS Divisions (
            division_id INTEGER PRIMARY KEY,
            division_name TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Teams (
            team_id INTEGER PRIMARY KEY,
            division_id INTEGER,
            FOREIGN KEY (division_id) REFERENCES Divisions(division_id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Players (
            player_id INTEGER PRIMARY KEY,
            player_name TEXT,
            team_id INTEGER,
            FOREIGN KEY (team_id) REFERENCES Teams(team_id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS BorrowingRules (
            rule_id INTEGER PRIMARY KEY,
            division_id INTEGER,
            is_borrowing_allowed BOOLEAN,
            FOREIGN KEY (division_id) REFERENCES Divisions(division_id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS BorrowFromDivision (
            borrowing_rule_id INTEGER,
            division_id INTEGER,
            FOREIGN KEY (borrowing_rule_id) REFERENCES BorrowingRules(rule_id),
            FOREIGN KEY (division_id) REFERENCES Divisions(division_id)
        )`);

        console.log('Database and tables created successfully.');
    });

    db.close();
}

module.exports = { initDb };
