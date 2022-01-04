const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  suite("POST /api/translate", (done) => {
    test("Text with no fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "", locale: "" })
        .end((err, res) => {
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Text with no fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "", locale: "" })
        .end((err, res) => {
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Text with no fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "", locale: "" })
        .end((err, res) => {
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Text with no fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "", locale: "" })
        .end((err, res) => {
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
  });
});
