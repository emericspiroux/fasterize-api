const devConfig = require("./config.dev.json")
const testConfig = require("./config.test.json")
const prodConfig = require("./config.prod.json")
const Logguer = require('basic-log')

/**
 * Getting environnement configuration file depending environnement 
 * type given into constructor.
 */
class ConfigFetcher {
  constructor(environnementType) {
    switch (environnementType) {
      case "DEV":
        this.config = devConfig
        Logguer.setLevel('all');
        break;
      case "TEST":
        this.config = testConfig
        Logguer.setLevel('none');
        break;
      case "PROD":
        this.config = prodConfig
        Logguer.setLevel('error');
        break;
      default:
        throw new Error("No configuration file defined")
    }
  }

  get env() {
    return this.config
  }
}

const config = new ConfigFetcher(process.env.ENVIRONNEMENT)
module.exports = config.env