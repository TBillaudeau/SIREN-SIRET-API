const siretModel = require('../models/siretModel');
const logger = require('../utils/logger');

/**
 * Retrieves the SIRET information from the database.
 *
 * @param {Object} req - The request object containing the SIRET value as a parameter.
 * @param {Object} res - The response object used to send the retrieved SIRET information.
 * @param {Function} next - The next middleware function.
 * @return {Object} The retrieved SIRET information as a JSON object, or an error message if the SIRET is not found.
 */
async function getSiret(req, res, next) {
    try {
        const siret = req.params.siret;

        //? Log action in the file
        logger.logAction(`GET request with SIRET: ${siret}`);

        //? Retrieve the SIRET information from the database
        const rows = await siretModel.getSiret(siret);

        //? Send the SIRET information as a JSON object if found
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('SIRET not found');
        }
    } catch (err) {
        next(err);
    }
}

/**
 * Deletes a SIRET from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {Object} A message if the SIRET was deleted, or an error message if the SIRET is not found.
 */
async function deleteSiret(req, res, next) {
    try {
        const siret = req.params.siret;

        //? Log action in the file
        logger.logAction(`DELETE request for SIRET: ${siret}`);

        //? Delete the SIRET from the database
        const result = await siretModel.deleteSiret(siret);

        //? Send a message if the SIRET was deleted
        if (result.rowCount > 0) {
            res.send('SIRET deleted');
        } else {
            res.status(404).send('SIRET not found');
        }
    } catch (err) {
        next(err);
    }
}

/**
 * Adds a new SIRET to the database.
 *
 * @param {Object} req - The request object containing the SIRET data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {Object} A success message if the SIRET was added, or an error message if there was an issue.
 */
async function addSiret(req, res, next) {
    try {
        // Extract parameters from request body
        const {
            siren, nic, siret, enseigne1Etablissement, statutDiffusionEtablissement, dateCreationEtablissement, trancheEffectifsEtablissement, anneeEffectifsEtablissement, activitePrincipaleRegistreMetiersEtablissement, dateDernierTraitementEtablissement, etablissementSiege, nombrePeriodesEtablissement, complementAdresseEtablissement, numeroVoieEtablissement, indiceRepetitionEtablissement, typeVoieEtablissement, libelleVoieEtablissement, codePostalEtablissement, libelleCommuneEtablissement, libelleCommuneEtrangerEtablissement, distributionSpecialeEtablissement, codeCommuneEtablissement, codeCedexEtablissement, libelleCedexEtablissement, codePaysEtrangerEtablissement, libellePaysEtrangerEtablissement, complementAdresse2Etablissement, numeroVoie2Etablissement, indiceRepetition2Etablissement, typeVoie2Etablissement, libelleVoie2Etablissement, codePostal2Etablissement, libelleCommune2Etablissement, libelleCommuneEtranger2Etablissement, distributionSpeciale2Etablissement, codeCommune2Etablissement, codeCedex2Etablissement, libelleCedex2Etablissement, codePaysEtranger2Etablissement, libellePaysEtranger2Etablissement, dateDebut, etatAdministratifEtablissement, enseigne2Etablissement, enseigne3Etablissement, denominationUsuelleEtablissement, activitePrincipaleEtablissement, nomenclatureActivitePrincipaleEtablissement, caractereEmployeurEtablissement
        } = req.query;

        // Log action in the file
        logger.logAction(`ADD request for SIRET: ${siret}`);

        // Add the SIRET to the database
        const result = await siretModel.addRow(
            siren, nic, siret, enseigne1Etablissement, statutDiffusionEtablissement, dateCreationEtablissement, trancheEffectifsEtablissement, anneeEffectifsEtablissement, activitePrincipaleRegistreMetiersEtablissement, dateDernierTraitementEtablissement, etablissementSiege, nombrePeriodesEtablissement, complementAdresseEtablissement, numeroVoieEtablissement, indiceRepetitionEtablissement, typeVoieEtablissement, libelleVoieEtablissement, codePostalEtablissement, libelleCommuneEtablissement, libelleCommuneEtrangerEtablissement, distributionSpecialeEtablissement, codeCommuneEtablissement, codeCedexEtablissement, libelleCedexEtablissement, codePaysEtrangerEtablissement, libellePaysEtrangerEtablissement, complementAdresse2Etablissement, numeroVoie2Etablissement, indiceRepetition2Etablissement, typeVoie2Etablissement, libelleVoie2Etablissement, codePostal2Etablissement, libelleCommune2Etablissement, libelleCommuneEtranger2Etablissement, distributionSpeciale2Etablissement, codeCommune2Etablissement, codeCedex2Etablissement, libelleCedex2Etablissement, codePaysEtranger2Etablissement, libellePaysEtranger2Etablissement, dateDebut, etatAdministratifEtablissement, enseigne2Etablissement, enseigne3Etablissement, denominationUsuelleEtablissement, activitePrincipaleEtablissement, nomenclatureActivitePrincipaleEtablissement, caractereEmployeurEtablissement
        );

        // Send a success message
        if (result.rowCount > 0) {
            res.send('SIRET added successfully');
        } else {
            res.status(400).send('Failed to add SIRET');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSiret,
    deleteSiret,
    addSiret,
};