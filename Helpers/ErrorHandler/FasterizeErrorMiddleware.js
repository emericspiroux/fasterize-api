const FasterizeError = require('./FasterizeError')

/**
 * Fasterize Error Middleware handler. When a route throw an error, 
 * this middleware will handle it and return a formatted response.
 * @param {Error} error 
 * @param {Response} res 
 */
function FasterizeErrorMiddleware(error, res) {
  if (error instanceof FasterizeError) {
    res
      .status(error.statusCode || 500)
      .send({code: error.statusCode, message: error.message, details: error.details})
  } else {
    res
      .status(500)
      .send({code: 500, message: "Internal error"})
  }
}

module.exports = FasterizeErrorMiddleware