const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // <-- ajouté
const app = express();
const PORT = 5000;

// DB setup
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'));

// Middleware
app.use(bodyParser.json());
app.use(cors()); // <-- activé CORS
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

// Nouvelle table pour stocker les réservations envoyées depuis le formulaire React
db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT,
    pickupAddress TEXT,
    dropoffAddress TEXT,
    note TEXT,
    date TEXT,
    time TEXT,
    status TEXT DEFAULT 'pending'
)`);

// Add reservation (ancienne route)
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

// Nouvelle route POST /api/bookings utilisée par le frontend React
app.post('/api/bookings', (req, res) => {
    const { firstName, lastName, email, phone, pickupAddress, dropoffAddress, note, date, time } = req.body;
    db.run(
        `INSERT INTO bookings (firstName, lastName, email, phone, pickupAddress, dropoffAddress, note, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, phone, pickupAddress, dropoffAddress, note, date, time],
        function (err) {
            if (err) {
                console.error('DB insert error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ id: this.lastID, status: 'pending' });
        }
    );
});

// GET list of bookings (utile pour debug/admin)
app.get('/api/bookings', (req, res) => {
    db.all(`SELECT * FROM bookings ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            console.error('DB select error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
