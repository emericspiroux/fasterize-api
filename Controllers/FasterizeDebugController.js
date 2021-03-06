const FasterizeDebugRequest = require('../Helpers/ControllersHelpers/FasterizeDebugController/FasterizeDebugRequest')
const FasterizeError = require('../Helpers/ErrorHandler/FasterizeError')
const FasterizeDebugModel = require('../Models/FasterizeDebugModel')

class FasterizeDebugController {
  async get(req, res, next) {
    let url = req.query.url
    try {
      if (!url)
        throw new FasterizeError(400, "Missing query parameter : url")
      let fasterizeDebugRequest = new FasterizeDebugRequest(url)
      await fasterizeDebugRequest.exec()
      let fasterizeDebugModel = new FasterizeDebugModel(fasterizeDebugRequest.headers)
      res.send(fasterizeDebugModel.toJSON())
    } catch (err) {
      if (err && (err.code === "ECONNRESET" || err.code === "ENOTFOUND" || err.code === "ECONNABORTED"))
        return next(new FasterizeError(404, "Website not found"))
      next(err)
    }
  }
}

module.exports = new FasterizeDebugController()