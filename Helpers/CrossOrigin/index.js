
/**
 * Permit to define Cross-Origin Resource Sharing (CORS) options 
 */
class CrossOrigin {

  /**
   * Define header with CORS options
   * @param {Response} res 
   */
  setHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET");
  }

  /**
   * Set CORS header for any request
   * @param {Request} req 
   * @param {Response} res 
   * @param {Next} next 
   */
  any(req, res, next) {
    this.setHeaders(res)
    if (req.method === 'OPTIONS')
      return res.status(200).end();
    next();
  }

  /**
   * Set CORS for Browser `/origin` request
   * @param {Request} req 
   * @param {Response} res 
   */
  origin(req, res) {
		this.setHeaders(res)
    res.send({origin:req.headers.origin, header:res.headers})
  }
}

module.exports = new CrossOrigin()