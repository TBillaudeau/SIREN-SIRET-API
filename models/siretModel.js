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

/**
 * Adds a record to the table.
 * 
 * @param {number} siren - The siren of the record to be added.
 * @param {number} nic - The nic of the record to be added.
 * @param {number} siret - The siret of the record to be added.
 * and etc ....
 * @return {Object} The added record.
 * 
 */
async function addRow(
    siren = null,
    nic = null,
    siret,
    enseigne1Etablissement,
    statutDiffusionEtablissement = null,
    dateCreationEtablissement = null,
    trancheEffectifsEtablissement = null,
    anneeEffectifsEtablissement = null,
    activitePrincipaleRegistreMetiersEtablissement = null,
    dateDernierTraitementEtablissement = null,
    etablissementSiege = null,
    nombrePeriodesEtablissement = null,
    complementAdresseEtablissement = null,
    numeroVoieEtablissement = null,
    indiceRepetitionEtablissement = null,
    typeVoieEtablissement = null,
    libelleVoieEtablissement = null,
    codePostalEtablissement = null,
    libelleCommuneEtablissement = null,
    libelleCommuneEtrangerEtablissement = null,
    distributionSpecialeEtablissement = null,
    codeCommuneEtablissement = null,
    codeCedexEtablissement = null,
    libelleCedexEtablissement = null,
    codePaysEtrangerEtablissement = null,
    libellePaysEtrangerEtablissement = null,
    complementAdresse2Etablissement = null,
    numeroVoie2Etablissement = null,
    indiceRepetition2Etablissement = null,
    typeVoie2Etablissement = null,
    libelleVoie2Etablissement = null,
    codePostal2Etablissement = null,
    libelleCommune2Etablissement = null,
    libelleCommuneEtranger2Etablissement = null,
    distributionSpeciale2Etablissement = null,
    codeCommune2Etablissement = null,
    codeCedex2Etablissement = null,
    libelleCedex2Etablissement = null,
    codePaysEtranger2Etablissement = null,
    libellePaysEtranger2Etablissement = null,
    dateDebut = null,
    etatAdministratifEtablissement = null,
    enseigne2Etablissement = null,
    enseigne3Etablissement = null,
    denominationUsuelleEtablissement = null,
    activitePrincipaleEtablissement = null,
    nomenclatureActivitePrincipaleEtablissement = null,
    caractereEmployeurEtablissement = null
) {
    //? Because SIRET is SIREN + NIC, we can calculate the SIREN and NIC from the SIRET
    if (siren === null) {
        siren = siret.substring(0, 9);
    }
    if (nic === null) {
        nic = siret.substring(9, 14);
    }

    const result = await pool.query(
        'INSERT INTO dataset_first_version (siren, nic, siret, enseigne1Etablissement, statutDiffusionEtablissement, dateCreationEtablissement, trancheEffectifsEtablissement, anneeEffectifsEtablissement, activitePrincipaleRegistreMetiersEtablissement, dateDernierTraitementEtablissement, etablissementSiege, nombrePeriodesEtablissement, complementAdresseEtablissement, numeroVoieEtablissement, indiceRepetitionEtablissement, typeVoieEtablissement, libelleVoieEtablissement, codePostalEtablissement, libelleCommuneEtablissement, libelleCommuneEtrangerEtablissement, distributionSpecialeEtablissement, codeCommuneEtablissement, codeCedexEtablissement, libelleCedexEtablissement, codePaysEtrangerEtablissement, libellePaysEtrangerEtablissement, complementAdresse2Etablissement, numeroVoie2Etablissement, indiceRepetition2Etablissement, typeVoie2Etablissement, libelleVoie2Etablissement, codePostal2Etablissement, libelleCommune2Etablissement, libelleCommuneEtranger2Etablissement, distributionSpeciale2Etablissement, codeCommune2Etablissement, codeCedex2Etablissement, libelleCedex2Etablissement, codePaysEtranger2Etablissement, libellePaysEtranger2Etablissement, dateDebut, etatAdministratifEtablissement, enseigne2Etablissement, enseigne3Etablissement, denominationUsuelleEtablissement, activitePrincipaleEtablissement, nomenclatureActivitePrincipaleEtablissement, caractereEmployeurEtablissement) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52)',
        [siren, nic, siret, enseigne1Etablissement, statutDiffusionEtablissement, dateCreationEtablissement, trancheEffectifsEtablissement, anneeEffectifsEtablissement, activitePrincipaleRegistreMetiersEtablissement, dateDernierTraitementEtablissement, etablissementSiege, nombrePeriodesEtablissement, complementAdresseEtablissement, numeroVoieEtablissement, indiceRepetitionEtablissement, typeVoieEtablissement, libelleVoieEtablissement, codePostalEtablissement, libelleCommuneEtablissement, libelleCommuneEtrangerEtablissement, distributionSpecialeEtablissement, codeCommuneEtablissement, codeCedexEtablissement, libelleCedexEtablissement, codePaysEtrangerEtablissement, libellePaysEtrangerEtablissement, complementAdresse2Etablissement, numeroVoie2Etablissement, indiceRepetition2Etablissement, typeVoie2Etablissement, libelleVoie2Etablissement, codePostal2Etablissement, libelleCommune2Etablissement, libelleCommuneEtranger2Etablissement, distributionSpeciale2Etablissement, codeCommune2Etablissement, codeCedex2Etablissement, libelleCedex2Etablissement, codePaysEtranger2Etablissement, libellePaysEtranger2Etablissement, dateDebut, etatAdministratifEtablissement, enseigne2Etablissement, enseigne3Etablissement, denominationUsuelleEtablissement, activitePrincipaleEtablissement, nomenclatureActivitePrincipaleEtablissement, caractereEmployeurEtablissement]
    );
    return result;
}


//? Export the functions
module.exports = {
    getSiret,
    deleteSiret,
    addRow
};
