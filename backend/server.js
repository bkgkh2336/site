const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            src TEXT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            patronymic TEXT,
            job_title TEXT,
            phone TEXT,
            email TEXT
        )`);
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});


app.get('/contacts', (req, res) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ contacts: rows });
    });
});

app.post('/contacts', (req, res) => {
    const { src, name, surname, patronymic, job_title, phone, email } = req.body;
    db.run(`INSERT INTO contacts (src, name, surname, patronymic, job_title, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [src, name, surname, patronymic, job_title, phone, email], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// DELETE /contacts/:id - delete specific contact
app.delete('/contacts/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM contacts WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Контакт не найден' });
        } else {
            res.json({ message: 'Контакт удален' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
