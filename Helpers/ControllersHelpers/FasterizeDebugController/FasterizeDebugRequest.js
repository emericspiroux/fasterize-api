const axios = require('axios')

/**
 * Request url given inside constructor
 */
class FasterizeDebugRequest {
  constructor(url) {
    this.url = url
    this.headers = {}
  }

  /**
   * Execute request to the url given inside constructor and fill `this.header` 
   * with response header. Can throw Axios error.
   */
  async exec() {
    let response = await axios.get(this.url)
    let header = response.headers
    header.statusCode = response.status
    this.headers = header
  }
}

module.exports = FasterizeDebugRequest