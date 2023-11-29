const siretModel = require('../models/siretModel');
const logger = require('../utils/logger');

async function getSiret(req, res, next) {
    try {
        const siret = req.params.siret;
        logger.logAction(`GET request for SIRET: ${siret}`);
        const rows = await siretModel.getSiret(siret);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('SIRET not found');
        }
    } catch (err) {
        next(err);
    }
}

async function deleteSiret(req, res, next) {
    try {
        const siret = req.params.siret;
        logger.logAction(`DELETE request for SIRET: ${siret}`);
        const result = await siretModel.deleteSiret(siret);
        if (result.rowCount > 0) {
            res.send('SIRET deleted');
        } else {
            res.status(404).send('SIRET not found');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSiret,
    deleteSiret
};