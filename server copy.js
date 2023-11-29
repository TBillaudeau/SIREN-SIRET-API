const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const app = express();
require('dotenv').config();
const port = 3000;

// PostgreSQL pool configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Verify connection
pool.connect((err, client, done) => {
  if (err) {
      console.error('Error connecting to the database', err.stack);
  } else {
      console.log('Connected to the database');
  }
  done();
});

// Log actions
function logAction(action) {
    const log = `${new Date().toISOString()} - ${action}\n`;
    fs.appendFileSync('log.txt', log, 'utf8');
}

// GET query on SIRET number
app.get('/siret/:siret', async (req, res) => {
    const siret = req.params.siret;
    logAction(`GET request for SIRET: ${siret}`);
    console.log("Searching for SIRET ...");

    try {
        const { rows } = await pool.query('SELECT * FROM dataset_first_version WHERE siret = $1', [siret]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('SIRET not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// DELETE query on SIRET number
app.delete('/siret/:siret', async (req, res) => {
    const siret = req.params.siret;
    logAction(`DELETE request for SIRET: ${siret}`);

    try {
        const result = await pool.query('DELETE FROM dataset_first_version WHERE siret = $1 RETURNING *', [siret]);
        if (result.rowCount > 0) {
            res.send('SIRET deleted');
        } else {
            res.status(404).send('SIRET not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});