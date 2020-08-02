const express = require('express');
const FaterizeDebugRoute = require('./FaterizeDebugRoute')

const router = express.Router();

router.use('/', FaterizeDebugRoute);

module.exports = router;
