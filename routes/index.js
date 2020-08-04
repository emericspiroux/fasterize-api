const express = require('express');
const FaterizeDebugRoute = require('./FaterizeDebugRoute')
const PackageJSON = require('../package.json')
const router = express.Router();

router.get('/version', (_, res) => res.send({version: PackageJSON.version}))

router.use('/', FaterizeDebugRoute);

module.exports = router;
