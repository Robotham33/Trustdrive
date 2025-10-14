const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

// DB setup
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    prenom TEXT,
    depart TEXT,
    arrivee TEXT,
    prix REAL,
    notes TEXT,
    creneau TEXT,
    valide INTEGER DEFAULT 0
)`);

// Add reservation
app.post('/api/reservation', (req, res) => {
    const { nom, prenom, depart, arrivee, prix, notes, creneau } = req.body;
    db.run(
        `INSERT INTO reservations (nom, prenom, depart, arrivee, prix, notes, creneau) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nom, prenom, depart, arrivee, prix, notes, creneau],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// List available slots (creneaux)
app.get('/api/creneaux', (req, res) => {
    db.all(`SELECT creneau FROM reservations WHERE valide = 0`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const reserved = rows.map(r => r.creneau);
        // For demo: slots from 8h to 20h
        const allSlots = Array.from({length: 13}, (_, i) => `${8+i}:00`);
        const available = allSlots.filter(s => !reserved.includes(s));
        res.json({ available });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
