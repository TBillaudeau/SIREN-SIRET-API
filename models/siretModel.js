const { Pool } = require('pg');
require('dotenv').config();

//? Create a new pool (we will use environement variables to store the database credentials)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//? We verify connection (mostly to verify that we were connected when working with Ngrok)
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database');
    }
    done();
  });

/**
 * Retrieves rows from the database based on the provided siret.
 *
 * @param {number} siret - The siret to query the database with.
 * @return {Array} An array of rows matching the provided siret.
 */
async function getSiret(siret) {
    const { rows } = await pool.query('SELECT * FROM dataset_first_version WHERE siret = $1', [siret]);
    return rows;
}

/**
 * Deletes a record from the dataset_first_version table based on the given siret.
 *
 * @param {string} siret - The siret of the record to be deleted.
 * @return {Object} The deleted record.
 */
async function deleteSiret(siret) {
    const result = await pool.query('DELETE FROM dataset_first_version WHERE siret = $1 RETURNING *', [siret]);
    return result;
}

//? Export the functions
module.exports = {
    getSiret,
    deleteSiret
};
