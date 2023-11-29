const { Pool } = require('pg');
require('dotenv').config();

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

async function getSiret(siret) {
    const { rows } = await pool.query('SELECT * FROM dataset_first_version WHERE siret = $1', [siret]);
    return rows;
}

async function deleteSiret(siret) {
    const result = await pool.query('DELETE FROM dataset_first_version WHERE siret = $1 RETURNING *', [siret]);
    return result;
}

module.exports = {
    getSiret,
    deleteSiret
};
