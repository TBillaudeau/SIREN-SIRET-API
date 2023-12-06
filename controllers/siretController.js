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
            siren, nic, siret, statutdiffusionetablissement, datecreationetablissement, trancheeffectifsetablissement, anneeeffectifsetablissement, activiteprincipaleregistremetiersetablissement, datederniertraitementetablissement, etablissementsiege, nombreperiodesetablissement, complementadresseetablissement, numerovoieetablissement, indicerepetitionetablissement, typevoieetablissement, libellevoieetablissement, codepostaletablissement, libellecommuneetablissement, libellecommuneetrangeretablissement, distributionspecialeetablissement, codecommuneetablissement, codecedexetablissement, libellecedexetablissement, codepaysetrangeretablissement, libellepaysetrangeretablissement, complementadresse2etablissement, numerovoie2etablissement, indicerepetition2etablissement, typevoie2etablissement, libellevoie2etablissement, codepostal2etablissement, libellecommune2etablissement, libellecommuneetranger2etablissement, distributionspeciale2etablissement, codecommune2etablissement, codecedex2etablissement, libellecedex2etablissement, codepaysetranger2etablissement, libellepaysetranger2etablissement, datedebut, etatadministratifetablissement, enseigne1etablissement, enseigne2etablissement, enseigne3etablissement, denominationusuelleetablissement, activiteprincipaleetablissement, nomenclatureactiviteprincipaleetablissement, caractereemployeuretablissement        
        } = req.query;

        // Check if mandatory fields are provided
        if (!siret) {
            return res.status(400).send('SIRET is required for adding');
        }

        // Log action in the file
        logger.logAction(`ADD request for SIRET: ${siret}`);

        // Add the SIRET to the database
        const result = await siretModel.addRow(siren, nic, siret, statutdiffusionetablissement, datecreationetablissement, trancheeffectifsetablissement, anneeeffectifsetablissement, activiteprincipaleregistremetiersetablissement, datederniertraitementetablissement, etablissementsiege, nombreperiodesetablissement, complementadresseetablissement, numerovoieetablissement, indicerepetitionetablissement, typevoieetablissement, libellevoieetablissement, codepostaletablissement, libellecommuneetablissement, libellecommuneetrangeretablissement, distributionspecialeetablissement, codecommuneetablissement, codecedexetablissement, libellecedexetablissement, codepaysetrangeretablissement, libellepaysetrangeretablissement, complementadresse2etablissement, numerovoie2etablissement, indicerepetition2etablissement, typevoie2etablissement, libellevoie2etablissement, codepostal2etablissement, libellecommune2etablissement, libellecommuneetranger2etablissement, distributionspeciale2etablissement, codecommune2etablissement, codecedex2etablissement, libellecedex2etablissement, codepaysetranger2etablissement, libellepaysetranger2etablissement, datedebut, etatadministratifetablissement, enseigne1etablissement, enseigne2etablissement, enseigne3etablissement, denominationusuelleetablissement, activiteprincipaleetablissement, nomenclatureactiviteprincipaleetablissement, caractereemployeuretablissement);

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

/**
 * Updates an existing SIRET entry in the database.
 *
 * @param {Object} req - The request object containing the updated SIRET data.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {Object} A success message if the SIRET was updated, or an error message if there was an issue.
 */
async function updateSiret(req, res, next) {
    try {

        // Extract parameters from the request body
        const {
            siren, nic, siret, statutdiffusionetablissement, datecreationetablissement, trancheeffectifsetablissement, anneeeffectifsetablissement, activiteprincipaleregistremetiersetablissement, datederniertraitementetablissement, etablissementsiege, nombreperiodesetablissement, complementadresseetablissement, numerovoieetablissement, indicerepetitionetablissement, typevoieetablissement, libellevoieetablissement, codepostaletablissement, libellecommuneetablissement, libellecommuneetrangeretablissement, distributionspecialeetablissement, codecommuneetablissement, codecedexetablissement, libellecedexetablissement, codepaysetrangeretablissement, libellepaysetrangeretablissement, complementadresse2etablissement, numerovoie2etablissement, indicerepetition2etablissement, typevoie2etablissement, libellevoie2etablissement, codepostal2etablissement, libellecommune2etablissement, libellecommuneetranger2etablissement, distributionspeciale2etablissement, codecommune2etablissement, codecedex2etablissement, libellecedex2etablissement, codepaysetranger2etablissement, libellepaysetranger2etablissement, datedebut, etatadministratifetablissement, enseigne1etablissement, enseigne2etablissement, enseigne3etablissement, denominationusuelleetablissement, activiteprincipaleetablissement, nomenclatureactiviteprincipaleetablissement, caractereemployeuretablissement        
        } = req.query;

        // Check if mandatory fields are provided
        if (!siret) {
            return res.status(400).send('SIRET is required for updating');
        }

        // Log action in the file
        logger.logAction(`UPDATE request for SIRET: ${siret}`);

        // Update the SIRET in the database
        const result = await siretModel.updateSiret(siren, nic, siret, statutdiffusionetablissement, datecreationetablissement, trancheeffectifsetablissement, anneeeffectifsetablissement, activiteprincipaleregistremetiersetablissement, datederniertraitementetablissement, etablissementsiege, nombreperiodesetablissement, complementadresseetablissement, numerovoieetablissement, indicerepetitionetablissement, typevoieetablissement, libellevoieetablissement, codepostaletablissement, libellecommuneetablissement, libellecommuneetrangeretablissement, distributionspecialeetablissement, codecommuneetablissement, codecedexetablissement, libellecedexetablissement, codepaysetrangeretablissement, libellepaysetrangeretablissement, complementadresse2etablissement, numerovoie2etablissement, indicerepetition2etablissement, typevoie2etablissement, libellevoie2etablissement, codepostal2etablissement, libellecommune2etablissement, libellecommuneetranger2etablissement, distributionspeciale2etablissement, codecommune2etablissement, codecedex2etablissement, libellecedex2etablissement, codepaysetranger2etablissement, libellepaysetranger2etablissement, datedebut, etatadministratifetablissement, enseigne1etablissement, enseigne2etablissement, enseigne3etablissement, denominationusuelleetablissement, activiteprincipaleetablissement, nomenclatureactiviteprincipaleetablissement, caractereemployeuretablissement);

        // Send a success message
        if (result.rowCount > 0) {
            res.send('SIRET updated successfully');
        } else {
            res.status(400).send('Failed to update SIRET');
        }
    } catch (err) {
        next(err);
    }
}


// Export functions
module.exports = {
    getSiret,
    deleteSiret,
    addSiret,
    updateSiret
};