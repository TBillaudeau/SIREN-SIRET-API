const express = require('express');
const router = express.Router();
const siretController = require('../controllers/siretController');

router.get('/:siret', siretController.getSiret);
router.delete('/:siret', siretController.deleteSiret);

module.exports = router;