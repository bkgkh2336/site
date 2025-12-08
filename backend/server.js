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
                email TEXT
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS phone_contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                contact_id INTEGER NOT NULL,
                phone TEXT NOT NULL,
                FOREIGN KEY (contact_id) REFERENCES contacts(id)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "departments" (
                "id"	INTEGER NOT NULL,
                "name"	TEXT,
                "email"	TEXT,
                "src"   TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "phone_departments" (
                "id"	INTEGER NOT NULL,
                "id_department"	INTEGER NOT NULL,
                "phone"	TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
    }
});

const VALID_TABLES = ['contacts', 'phone_contacts', 'departments', 'phone_departments'];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.get('/:table', (req, res) => {
    if (!VALID_TABLES.includes(req.params.table)) {
        res.status(400).json({ error: 'Invalid table name' });
        return;
    }
    const table = req.params.table;
    const query = `SELECT * FROM ${table}`;
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.put('/:table/:id', (req, res) => {
    if (!VALID_TABLES.includes(req.params.table)) {
        res.status(400).json({ error: 'Invalid table name' });
        return;
    }
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body cannot be empty for update' });
    }
    const table = req.params.table;
    const id = req.params.id;
    const data = req.body;
    const setClause = Object.keys(data).map((key) => `${key} = ?`).join(', ');
    const row = [...Object.values(data), id];
    const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
    db.run(query, row, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
