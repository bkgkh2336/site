const express = require('express');
const cors = require('cors');
const initSqlJs = require('sql.js'); // Изменено
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const dbPath = process.env.DATABASE_PATH || './contacts.db';

let db;

// Функция для сохранения БД из памяти в файл
const saveDb = () => {
    if (!db) return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
    console.log('Database saved to disk.');
};

// Инициализация sql.js
initSqlJs().then(SQL => {
    if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(fileBuffer);
        console.log('Connected to existing SQLite database (via sql.js).');
    } else {
        db = new SQL.Database();
        console.log('Created new SQLite database in memory.');
    }

    // Создание таблиц (теперь синхронно)
    try {
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
                "id"    INTEGER NOT NULL,
                "name"  TEXT,
                "email" TEXT,
                "src"   TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "phone_departments" (
                "id"    INTEGER NOT NULL,
                "id_department" INTEGER NOT NULL,
                "phone" TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "documents" (
                "id"    INTEGER NOT NULL,
                "id_group" INTEGER NOT NULL,
                "name"  TEXT NOT NULL,
                "src"   TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "documents_group" (
                "id"    INTEGER NOT NULL,
                "name"  TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "ventilation_services" (
                "id"    INTEGER NOT NULL,
                "name"  TEXT,
                "price_no_nds"  REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "waste_services" (
                "id"    INTEGER,
                "name"  TEXT,
                "price_no_dns_summer"   REAL,
                "price_no_dns_winter"   REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "electro_services" (
                "id"    INTEGER,
                "name"  TEXT,
                "price_no_nds"  REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "grass_services" (
                "id"    INTEGER,
                "name"  TEXT,
                "price_no_nds_is_solid" REAL,
                "price_no_nds_no_solid" REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "heating_services" (
                "id"    INTEGER,
                "name"  TEXT,
                "unit"  TEXT,
                "price_no_nds"  REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "plumbing_services" (
                "id"    INTEGER,
                "name"  TEXT,
                "unit"  TEXT,
                "price_no_nds"  REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "el_inst_services" (
                "id"    INTEGER,
                "name"  TEXT,
                "unit"  TEXT,
                "price_no_nds"  REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "transport_population_and_budget" (
                "id"    INTEGER,
                "name"  TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "transport_price_population_and_budget" (
                "id"    INTEGER,
                "id_transport"  INTEGER NOT NULL,
                "unit"  TEXT,
                "price_no_nds"  REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "transport_jur" (
                "id"    INTEGER,
                "name"  TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "transport_price_jur" (
                "id"    INTEGER,
                "id_transport"  INTEGER,
                "price" REAL,
                "unit"  TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "transport_price_other" (
                "id"    INTEGER,
                "id_transport"  INTEGER,
                "price" REAL,
                "unit"  TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "transport_other" (
                "id"    INTEGER,
                "name"  TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "schedule_reception" (
                "id"    INTEGER,
                "full_name" TEXT NOT NULL,
                "position"  TEXT NOT NULL,
                "reception_time"    TEXT NOT NULL,
                "phone_line_time"   TEXT,
                "replacement"   TEXT,
                "organization"  TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        
        saveDb(); // Первичное сохранение
        
        cron.schedule('0 9 * * *', scrapeAndSave);
        cron.schedule('0 15 * * *', scrapeAndSave);
        scrapeAndSave();
        
    } catch (err) {
        console.error('Database initialization error:', err.message);
    }
});

// Хелпер для превращения результата sql.js в массив объектов
const getRows = (query, params = []) => {
    const res = db.exec(query, params);
    if (res.length === 0) return [];
    const columns = res[0].columns;
    const values = res[0].values;
    return values.map(row => {
        let obj = {};
        columns.forEach((col, i) => obj[col] = row[i]);
        return obj;
    });
};

const VALID_TABLES = [
    'contacts', 'phone_contacts', 'departments', 'phone_departments',
    'documents_group', 'documents', 'ventilation_services', 'waste_services',
    'electro_services', 'grass_services', 'heating_services', 'plumbing_services',
    'el_inst_services', 'transport_price_population_and_budget',
    'transport_population_and_budget', 'transport_price_jur', 'transport_jur',
    'transport_price_other', 'transport_other', 'schedule_reception'
];

app.use(cors());
app.use(express.json());

const scrapeAndSave = async () => {
    // Твой код парсера без изменений
    try {
        const baseUrl = 'https://gsz.gov.by';
        const initialUrl = 'https://gsz.gov.by/registration/vacancy-search/?profession=&region=&salary_min=&wage_rate_from=&wage_rate_to=&business_entity=121431&search_period=0&paginate_by=10&sort_by=sort_published_at_desc';
        const { data } = await axios.get(initialUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        const $ = cheerio.load(data);
        const pageLinks = [];
        $('.pagination a').each((_i, el) => {
            const href = $(el).attr('href');
            if (href) pageLinks.push(baseUrl + href);
        });

        const allJobs = [];
        $('h4.job-title').each((i, el) => {
            const title = $(el).text().trim();
            const salary = $(el).siblings('ul.job-info').find('span.salary').text().trim() || 'Не указана';
            const address = $(el).siblings('ul.job-info').find('span.address').text().trim();
            const link = $(el).parent('a').attr('href') || $(el).find('a').attr('href');
            if (!allJobs.find(job => job.link === link)) allJobs.push({ title, salary, address, link });
        });

        for (const pageUrl of pageLinks) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const { data: pageData } = await axios.get(pageUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0' },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })
                });
                const $page = cheerio.load(pageData);
                $page('h4.job-title').each((i, el) => {
                    const title = $page(el).text().trim();
                    const salary = $page(el).siblings('ul.job-info').find('span.salary').text().trim() || 'Не указана';
                    const address = $page(el).siblings('ul.job-info').find('span.address').text().trim();
                    const link = $page(el).parent('a').attr('href') || $page(el).find('a').attr('href');
                    if (!allJobs.find(job => job.link === link)) allJobs.push({ title, salary, address, link });
                });
            } catch (e) {}
        }
        fs.writeFileSync('./vacancies.json', JSON.stringify(allJobs, null, 2));
        console.log('Vacancies scraped.');
    } catch (error) {
        console.error('Scraping error:', error.message);
    }
};

app.get('/api/scrape', (req, res) => {
    try {
        if (!fs.existsSync('vacancies.json')) return res.status(404).json({ error: 'Data not ready' });
        const data = fs.readFileSync('vacancies.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// API Эндпоинты переделаны под синхронный sql.js
app.get('/api/:table', (req, res) => {
    if (!VALID_TABLES.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
    try {
        const rows = getRows(`SELECT * FROM ${req.params.table}`);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/:table/:id', (req, res) => {
    const { table, id } = req.params;
    const data = req.body;
    if (!VALID_TABLES.includes(table)) return res.status(400).json({ error: 'Invalid table' });
    if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Empty body' });

    const setClause = Object.keys(data).map((key) => `${key} = ?`).join(', ');
    const params = [...Object.values(data), id];
    try {
        db.run(`UPDATE ${table} SET ${setClause} WHERE id = ?`, params);
        saveDb(); // Сохраняем на диск после изменения
        res.json({ message: 'Updated successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/transport_services', (req, res) => {
    const query = `
        SELECT tp.id, t.name, tp.unit, tp.price_no_nds
        FROM transport_price_population_and_budget tp
        JOIN transport_population_and_budget t ON tp.id_transport = t.id
        ORDER BY t.name, tp.id
    `;
    try { res.json(getRows(query)); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/transport_jur_services', (req, res) => {
    const query = `
        SELECT tp.id, t.name, tp.unit, tp.price
        FROM transport_price_jur tp
        JOIN transport_jur t ON tp.id_transport = t.id
        ORDER BY t.name, tp.id
    `;
    try { res.json(getRows(query)); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/transport_other_services', (req, res) => {
    const query = `
        SELECT tp.id, t.name, tp.unit, tp.price
        FROM transport_price_other tp
        JOIN transport_other t ON tp.id_transport = t.id
        ORDER BY t.name, tp.id
    `;
    try { res.json(getRows(query)); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.use(express.static(path.join(__dirname, './dist')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});