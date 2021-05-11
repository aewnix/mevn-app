const express = require('express');
const router = express.Router();
const API = require('../controllers/api');

router.get('/getHistory', API.fetchHistory);

router.post('/getTotal', API.getTotal);

router.post('/updatePrices', API.updatePrices);

router.get('/getPrices', API.getPrices);

module.exports = router;
