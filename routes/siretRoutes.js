const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
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
router.get('/:siret', [
    param('siret')
      .isNumeric().withMessage('SIRET must be numeric')
      .isLength({ min: 9, max: 14 }).withMessage('SIRET must be 9 digits long for Siren with optional 5 digits NIC'),
], (req, res, next) => validationResult(req).isEmpty() ? next() : res.status(400).json({ errors: validationResult(req).array() }), siretController.getSiret);

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

/**
 * @swagger
 * /siret:
 *   post:
 *     summary: Add a new SIRET
 *     tags: [Siret]
 *     parameters:
 *       - in: query
 *         name: siren
 *         required: false
 *         description: The SIREN number from the establishment's record.
 *         schema:
 *           type: string
 *       - in: query
 *         name: nic
 *         required: false
 *         description: The NIC (Internal Classification Number) from the establishment's record.
 *         schema:
 *           type: string
 *       - in: query
 *         name: siret
 *         required: true
 *         description: The SIRET (SIREN + NIC) number from the establishment's record.
 *         schema:
 *           type: string
 *       - in: query
 *         name: statutdiffusionetablissement
 *         required: false
 *         description: The diffusion status of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: datecreationetablissement
 *         required: false
 *         description: The establishment's creation date.
 *         schema:
 *           type: string
 *       - in: query
 *         name: trancheeffectifsetablissement
 *         required: false
 *         description: The employee size range of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: anneeeffectifsetablissement
 *         required: false
 *         description: The year of the establishment's employee count.
 *         schema:
 *           type: string
 *       - in: query
 *         name: activiteprincipaleregistremetiersetablissement
 *         required: false
 *         description: The primary activity registered in the trade registry for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: datederniertraitementetablissement
 *         required: false
 *         description: The date of the last treatment for the establishment in the Sirene directory.
 *         schema:
 *           type: string
 *       - in: query
 *         name: etablissementsiege
 *         required: false
 *         description: Indicates if the establishment is the main office.
 *         schema:
 *           type: string
 *       - in: query
 *         name: nombreperiodesetablissement
 *         required: false
 *         description: The number of periods for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: complementadresseetablissement
 *         required: false
 *         description: Additional address information for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: numerovoieetablissement
 *         required: false
 *         description: The street number of the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: indicerepetitionetablissement
 *         required: false
 *         description: Indicator of repetition for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: typevoieetablissement
 *         required: false
 *         description: The type of street for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellevoieetablissement
 *         required: false
 *         description: The street name of the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codepostaletablissement
 *         required: false
 *         description: The postal code of the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellecommuneetablissement
 *         required: false
 *         description: The name of the commune for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellecommuneetrangeretablissement
 *         required: false
 *         description: The name of the foreign commune for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: distributionspecialeetablissement
 *         required: false
 *         description: Special distribution information for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codecommuneetablissement
 *         required: false
 *         description: The commune code for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codecedexetablissement
 *         required: false
 *         description: The Cedex code for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellecedexetablissement
 *         required: false
 *         description: The Cedex name for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codepaysetrangeretablissement
 *         required: false
 *         description: The foreign country code for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellepaysetrangeretablissement
 *         required: false
 *         description: The foreign country name for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: complementadresse2etablissement
 *         required: false
 *         description: Secondary address complement for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: numerovoie2etablissement
 *         required: false
 *         description: Secondary street number for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: indicerepetition2etablissement
 *         required: false
 *         description: Secondary indicator of repetition for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: typevoie2etablissement
 *         required: false
 *         description: Secondary street type for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellevoie2etablissement
 *         required: false
 *         description: Secondary street name for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codepostal2etablissement
 *         required: false
 *         description: Secondary postal code for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellecommune2etablissement
 *         required: false
 *         description: Secondary commune name for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellecommuneetranger2etablissement
 *         required: false
 *         description: Secondary name of the foreign commune for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: distributionspeciale2etablissement
 *         required: false
 *         description: Secondary special distribution information for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codecommune2etablissement
 *         required: false
 *         description: Secondary commune code for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codecedex2etablissement
 *         required: false
 *         description: Secondary Cedex code for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellecedex2etablissement
 *         required: false
 *         description: Secondary Cedex name for the establishment's address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: codepaysetranger2etablissement
 *         required: false
 *         description: Secondary foreign country code for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: libellepaysetranger2etablissement
 *         required: false
 *         description: Secondary foreign country name for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: datedebut
 *         required: false
 *         description: The start date for the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: etatadministratifetablissement
 *         required: false
 *         description: The administrative state of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: enseigne1etablissement
 *         required: false
 *         description: The first trade name of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: enseigne2etablissement
 *         required: false
 *         description: The second trade name of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: enseigne3etablissement
 *         required: false
 *         description: The third trade name of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: denominationusuelleetablissement
 *         required: false
 *         description: The usual denomination of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: activiteprincipaleetablissement
 *         required: false
 *         description: The primary activity of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: nomenclatureactiviteprincipaleetablissement
 *         required: false
 *         description: The nomenclature of the primary activity of the establishment.
 *         schema:
 *           type: string
 *       - in: query
 *         name: caractereemployeuretablissement
 *         required: false
 *         description: Indicates if the establishment is an employer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SIRET added successfully.
 *       400:
 *         description: Failed to add SIRET.
 */
router.post('/', siretController.addSiret);

module.exports = router;