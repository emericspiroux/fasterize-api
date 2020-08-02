const app = require('../app')
const faterizeDebugRoute = require('./routes/Public/FaterizeDebugRoute.test')

describe('init Server', () => {
  faterizeDebugRoute.testWith(app)
})