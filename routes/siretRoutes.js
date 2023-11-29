const express = require('express');
const router = express.Router();
const siretController = require('../controllers/siretController');

/**
 * @swagger
 * /siret/{siret}:
 *   get:
 *     summary: Retrieve a single SIRET
 *     tags: [Siret]
 *     parameters:
 *       - in: path
 *         name: siret
 *         required: true
 *         description: Numeric ID of the SIRET to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single SIRET.
 *       404:
 *         description: SIRET not found.
 */
router.get('/:siret', siretController.getSiret);

/**
 * @swagger
 * /siret/{siret}:
 *   delete:
 *     summary: Delete a SIRET
 *     tags: [Siret]
 *     parameters:
 *       - in: path
 *         name: siret
 *         required: true
 *         description: Numeric ID of the SIRET to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SIRET deleted successfully.
 *       404:
 *         description: SIRET not found.
 */
router.delete('/:siret', siretController.deleteSiret);


router.post('/', siretController.addSiret);

module.exports = router;