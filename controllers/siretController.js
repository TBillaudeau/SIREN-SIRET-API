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


//? Export the functions
module.exports = {
    getSiret,
    deleteSiret
};