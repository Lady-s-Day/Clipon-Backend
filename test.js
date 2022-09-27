const chai = require("chai");
const { expect, assert } = require("chai");
const chaiHttp = require("chai-http");

const config = require("./knexfile");
const knex = require("knex")(config);

const app = require("./app");

chai.use(chaiHttp);

describe("clipon_Backend", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });
  });
  describe("get methods", () => {
    it("should get all from clinics", async () => {
      const expected = await knex("clinics").select();
      const res = await request.get("/clinics");
      const actual = JSON.parse(res.text);
      expect(actual[0].id).to.eq(expected[0].id);
      expect(actual.length).to.eq(expected.length);
    });
  });
  describe("post method", () => {
    it("should insert a new collumn into approved_clinics table", (done) => {
      request
        .post("/approved")
        .send({
          id: 10,
          uid: "53kR3H9AWHcp7u2pQlqELzRaMz13",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("get method", () => {
    it("get approved clinics from approved_clinics table", async () => {
      const expected = await knex("approved_clinics")
        .select()
        .where({ clinic_id: 10 });
      const res = await request.get("/approved/10");
      const actual = JSON.parse(res.text);
      expect(actual[0].id).to.eq(expected[0].id);
      expect(actual.length).to.eq(expected.length);
    });
  });
});
