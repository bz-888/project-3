const express = require('express');
const router = express.Router();
const groceriesCtrl = require('../../controllers/groceries');

router.post('/', groceriesCtrl.create);
router.get('/', groceriesCtrl.index)

module.exports = router;