const flagFileJSON = require('./flagsDecode.json')

/**
 * Getting Fasterize flag user readable from `x-fstrz` header line.
 * Give the flag string to the contructor and call `decode` method 
 * to get array with readable informations.
 * Usage :
 * ```
 *  let fasterizeFlagDecoder = new FasterizeFlagDecoder("o,c")
 *  let readableFlags = fasterizeFlagDecoder.decode()
 *  console.log("Fasterize status :", readableFlags)
 * ```
 */
class FasterizeFlagDecoder {
  constructor(flagString) {
    this.flagString = flagString
  }

  /**
   * Decode flags and return array with readable informations.
   * Split flags letters by "," and decode it with `flagsDecode.json`
   */
  decode() {
    let flagLetters = this.flagString.split(',')
    let flagsDecoded = []
    for (let flagLetter of flagLetters) {
      let decodeFlagLetter = flagFileJSON[flagLetter]
      if (decodeFlagLetter)
        flagsDecoded.push(decodeFlagLetter)
    }
    return flagsDecoded
  }
}

module.exports = FasterizeFlagDecoder