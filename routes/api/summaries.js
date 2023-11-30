const express = require('express');
const router = express.Router();
const summariesCtrl = require('../../controllers/summaries');

router.get('/', summariesCtrl.index)

module.exports = router;