const express = require('express')
const bodyParser = require('body-parser')
const logguer = require('basic-log')

const configuration = require('./config')

const Routes = require('./routes')

const CrossOrigin = require('./Helpers/CrossOrigin')
const FasterizeErrorMiddleware = require('./Helpers/ErrorHandler/FasterizeErrorMiddleware')

const app = express();

// --------------- CORS ---------------------
app.use((...args) => CrossOrigin.any(...args));
app.use('/origin', (...args) => CrossOrigin.origin(...args))
// --------------- END CORS -----------------

// --------------- BODY PARSER --------------
app.use(bodyParser.json({limit:"100mb"}));
app.use(bodyParser.urlencoded({extended:true}));
// --------------- END BODY PARSER ----------

// --------------- ROUTE INFOS --------------
app.use((req, _, next) => {
	logguer.i(req.method + " " + req.originalUrl)
	next()
})
// --------------- END ROUTE INFOS ----------

// --------------- ROUTE DEFINE --------------
app.use(Routes);
// --------------- END ROUTE DEFINE ----------

// --------------- ROUTE ERROR --------------
app.use((err, req, res, next) => FasterizeErrorMiddleware(err, res)); //eslint-disable-line no-unused-vars
// --------------- END ROUTE ERROR ----------

// --------------- LAUNCH SERVER -------------
app.listen(configuration.port);
console.log(`\x1b[34m[INFO INIT]\x1b[0m Starting Server on port ${configuration.port}: \x1b[32mOK\x1b[0m`);
// --------------- END LAUNCH SERVER ---------

module.exports = app
