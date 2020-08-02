const request = require('supertest')
const expect = require('chai').expect;

let goodUrl = encodeURI("https://www.fasterize.com/fr/")
let failUrl = encodeURI("https://google.fr")

function testWith(app) {
  describe('/', () => {
    it('with fasterize plugged website', (done) => {
      request(app)
        .get(`/?url=${goodUrl}`)
        .expect(200)
        .end((_, res) => {
          expect(res.body).to.have.property("plugged").that.is.a("boolean").to.be.true
          expect(res.body).to.have.property("statusCode").that.is.a("number").to.eql(200)
          expect(res.body).to.have.property("fstrzFlags").that.is.a("array").to.eql(["optimized","cached"])
          expect(res.body).to.have.property("cloudfrontStatus").that.is.a("string").to.eql("MISS")
          expect(res.body).to.have.property("cloudfrontPOP").that.is.a("string").to.eql("Paris")
          done()
        })
    });
    it('with fasterize not plugged website', (done) => {
      request(app)
        .get(`/?url=${failUrl}`)
        .expect(200)
        .end((_, res) => {
          expect(res.body).to.have.property("plugged").that.is.a("boolean").to.be.false
          expect(res.body).to.have.property("statusCode").that.is.a("number").to.eql(200)
          done()
        })
    });
    it('without specified url', (done) => {
      request(app)
        .get(`/`)
        .expect(400)
        .end((_, res) => {
          expect(res.body).to.have.property("code").that.is.a("number").to.eql(400)
          expect(res.body).to.have.property("message").that.is.a("string")
          done()
        })
    });
  });
}

module.exports.testWith = testWith