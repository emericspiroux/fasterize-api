const FasterizeFlagDecoder = require('../Helpers/FasterizeFlagDecoder')
const CloudFrontPopDecoder = require('../Helpers/CloudFrontPopDecoder')


/**
 * Fasterize debug model
 * Give response header to the model to structure object. Call `toJSON()` to get simplified JSON.
 * Usage :
 * ```
 *  let fasterizeDebugModel = new FasterizeDebugModel(headers)
 *  console.log("Fasterize debug :", fasterizeDebugModel.toJSON())
 * ```
 */
class FasterizeDebugModel {
  constructor(headers) {
    this.plugged = headers["server"] === "fasterize"
    this.statusCode = headers["statusCode"]
    if (this.plugged) {
      this.fstrzFlags = this.fstrzFlagsDecode(headers["x-fstrz"])
      this.cloudfrontStatus = this.cloudfrontStatusDecode(headers["x-cache"])
      this.cloudfrontPOP = this.cloudfrontPOPDecode(headers["x-amz-cf-pop"])
    }
  }

  fstrzFlagsDecode(flagsString) {
    let fasterizeFlagDecoder = new FasterizeFlagDecoder(flagsString)
    return fasterizeFlagDecoder.decode()
  }

  cloudfrontStatusDecode(xCache) {
    switch (xCache) {
      case "Hit from cloudfront":
        return "HIT"
      case "Miss from cloudfront":
        return "MISS"
      default:
        return "ERROR"
    }
  }

  cloudfrontPOPDecode(flagsString) {
    let cloudFrontPopDecoder = new CloudFrontPopDecoder(flagsString)
    return cloudFrontPopDecoder.attribute("city")
  }

  toJSON() {
    return {
      plugged: this.plugged,
      statusCode: this.statusCode,
      fstrzFlags: this.fstrzFlags,
      cloudfrontStatus: this.cloudfrontStatus,
      cloudfrontPOP: this.cloudfrontPOP
    }
  }
}

module.exports = FasterizeDebugModel