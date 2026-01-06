const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const cron = require('node-cron');
const fs = require('fs');

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
        db.run(`CREATE TABLE IF NOT EXISTS "documents" (
                "id"	INTEGER NOT NULL,
                "id_group" INTEGER NOT NULL,
                "name"	TEXT NOT NULL,
                "src"	TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS "documents_group" (
                "id"	INTEGER NOT NULL,
                "name"	TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "ventilation_services" (
                "id"	INTEGER NOT NULL,
                "name"	TEXT,
                "price_no_nds"	REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "waste_services" (
                "id"	INTEGER,
                "name"	TEXT,
                "price_no_dns_summer"	REAL,
                "price_no_dns_winter"	REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`
            CREATE TABLE IF NOT EXISTS "electro_services" (
            "id"	INTEGER,
            "name"	TEXT,
            "price_no_nds"	REAL,
            PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "grass_services" (
                "id"	INTEGER,
                "name"	TEXT,
                "price_no_nds_is_solid"	REAL,
                "price_no_nds_no_solid"	REAL,
            	PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "heating_services" (
                "id"	INTEGER,
                "name"	TEXT,
                "unit"	TEXT,
                "price_no_nds"	REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "plumbing_services" (
                "id"	INTEGER,
                "name"	TEXT,
                "unit"	TEXT,
                "price_no_nds"	REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "el_inst_services" (
                "id"	INTEGER,
                "name"	TEXT,
                "unit"	TEXT,
                "price_no_nds"	REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "transport_population_and_budget" (
                "id"	INTEGER,
                "name"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "transport_price_population_and_budget" (
                "id"	INTEGER,
                "id_transport"	INTEGER NOT NULL,
                "unit"	TEXT,
                "price_no_nds"	REAL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "transport_jur" (
                "id"	INTEGER,
                "name"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "transport_price_jur" (
                "id"	INTEGER,
                "id_transport"	INTEGER,
                "price"	REAL,
                "unit"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "transport_price_other" (
                "id"	INTEGER,
                "id_transport"	INTEGER,
                "price"	REAL,
                "unit"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "transport_other" (
                "id"	INTEGER,
                "name"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS "schedule_reception" (
                "id"	INTEGER,
                "full_name"	TEXT NOT NULL,
                "position"	TEXT NOT NULL,
                "reception_time"	TEXT NOT NULL,
                "phone_line_time"	TEXT,
                "replacement"	TEXT,
                "organization"	TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
        )`)
        // Schedule scraping twice a day: at 9 AM and 3 PM
        cron.schedule('0 9 * * *', scrapeAndSave);
        cron.schedule('0 15 * * *', scrapeAndSave);

        // Initial scrape on server start
        scrapeAndSave();
    }
});

const VALID_TABLES = [
    'contacts',
    'phone_contacts',
    'departments',
    'phone_departments',
    'documents_group',
    'documents',
    'ventilation_services',
    'waste_services',
    'electro_services',
    'grass_services',
    'heating_services',
    'plumbing_services',
    'el_inst_services',
    'transport_price_population_and_budget',
    'transport_population_and_budget',
    'transport_price_jur',
    'transport_jur',
    'transport_price_other',
    'transport_other',
    'schedule_reception'
];

const scrapeAndSave = async () => {
    try {
        const baseUrl = 'https://gsz.gov.by';
        const initialUrl = 'https://gsz.gov.by/registration/vacancy-search/?profession=&region=&salary_min=&wage_rate_from=&wage_rate_to=&business_entity=121431&search_period=0&paginate_by=10&sort_by=sort_published_at_desc';
        const { data } = await axios.get(initialUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        const $ = cheerio.load(data);
        const pageLinks = [];
        $('.pagination a').each((_i, el) => {
            const href = $(el).attr('href');
            if (href) {
                pageLinks.push(baseUrl + href);
            }
        });

        const allJobs = [];

        // Scrape the first page
        $('h4.job-title').each((i, el) => {
            const title = $(el).text().trim();
            const salary = $(el).siblings('ul.job-info').find('span.salary').text().trim() || 'Не указана';
            const address = $(el).siblings('ul.job-info').find('span.address').text().trim();
            const link = $(el).parent('a').attr('href') || $(el).find('a').attr('href');
            if (!allJobs.find(job => job.link === link)) allJobs.push({ title, salary, address, link });
        });

        for (const pageUrl of pageLinks) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                const { data: pageData } = await axios.get(pageUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    },
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false
                    })
                });
                const $page = cheerio.load(pageData);
                $page('h4.job-title').each((i, el) => {
                    const title = $page(el).text().trim();
                    const salary = $page(el).siblings('ul.job-info').find('span.salary').text().trim() || 'Не указана';
                    const address = $page(el).siblings('ul.job-info').find('span.address').text().trim();
                    const link = $page(el).parent('a').attr('href') || $page(el).find('a').attr('href');
                    if (!allJobs.find(job => job.link === link)) {
                        allJobs.push({ title, salary, address, link });
                    }
                });



            } catch (pageError) {
                console.error(`Error scraping ${pageUrl}:`, pageError.message);
            }
        }
        fs.writeFileSync('./vacancies.json', JSON.stringify(allJobs, null, 2));
        console.log('Vacancies scraped and saved to file.');
    } catch (error) {
        console.error('Error during scraping:', error.message);
    }
};

app.use(cors());
app.use(express.json());

// Translation endpoints
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.get('/scrape', (req, res) => {
    try {
        if (!fs.existsSync('vacancies.json')) {
            return res.status(404).json({ error: 'Vacancies data not available yet. Please try again later.' });
        }
        const data = fs.readFileSync('vacancies.json', 'utf8');
        const allJobs = JSON.parse(data);
        res.json(allJobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
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

// Special endpoint for transport services with JOIN
app.get('/transport_services', (req, res) => {
    const query = `
        SELECT 
            tp.id,
            t.name,
            tp.unit,
            tp.price_no_nds
        FROM transport_price_population_and_budget tp
        JOIN transport_population_and_budget t ON tp.id_transport = t.id
        ORDER BY t.name, tp.id
    `;
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Special endpoint for transport services for legal entities with JOIN
app.get('/transport_jur_services', (req, res) => {
    const query = `
        SELECT 
            tp.id,
            t.name,
            tp.unit,
            tp.price
        FROM transport_price_jur tp
        JOIN transport_jur t ON tp.id_transport = t.id
        ORDER BY t.name, tp.id
    `;
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Special endpoint for other transport services with JOIN
app.get('/transport_other_services', (req, res) => {
    const query = `
        SELECT 
            tp.id,
            t.name,
            tp.unit,
            tp.price
        FROM transport_price_other tp
        JOIN transport_other t ON tp.id_transport = t.id
        ORDER BY t.name, tp.id
    `;
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
