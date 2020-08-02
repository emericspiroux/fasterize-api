/**
 * Define what is a Fasterize API error. Extended from Error.
 */
class FasterizeError extends Error {
  constructor(statusCode, message, details) {
    super()
    this.message = message
    this.statusCode = statusCode
    this.details = details
  }
}

module.exports = FasterizeError