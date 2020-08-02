const express = require('express');
const FasterizeDebugController = require('../Controllers/FasterizeDebugController')

const router = express.Router();

router.get('/', (...args) => FasterizeDebugController.get(...args));

module.exports = router;
