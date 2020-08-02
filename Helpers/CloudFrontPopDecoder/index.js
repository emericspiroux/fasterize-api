const CloudFrontPopJSON = require('./CloudFrontPopDecode.json')

/**
 * Getting Cloud front informations from `x-amz-cf-pop` header line.
 * Give identifier to the contructor and call `attribute` method with wanted attribute name to get value.
 * Usage :
 * ```
 *  let cloudFrontPopDecoder = new CloudFrontPopDecoder("FRA2-C1")
 *  let city = cloudFrontPopDecoder.attribute("city")
 *  console.log("Cloud front city :", city)
 * ```
 */
class CloudFrontPopDecoder {
  constructor(identifier) {
    this.identifier = identifier
    this.decode()
  }

  /**
   * Fetching Cloud front object from `CloudFrontPopDecode.json` and set 
   * it into `this.identifierDecodedObject` based on 3 first letters of 
   * the identifier. If no identifier found, set `this.identifierDecodedObject` 
   * with empty object
   */
  decode() {
    if (!this.identifier) return this.identifierDecodedObject = {}
    let identifierFirstLetters = this.identifier.slice(0, 3)
    let identifierDecodedObject = CloudFrontPopJSON[identifierFirstLetters]
    this.identifierDecodedObject = identifierDecodedObject
  }

  /**
   * Give attribute value by given name. If attribute doesn't exist return `undefined`
   * @param {String} name 
   */
  attribute(name) {
    return (this.identifierDecodedObject && this.identifierDecodedObject[name])
  }
}

module.exports = CloudFrontPopDecoder