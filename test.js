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
  describe("get methods for clinics", () => {
    it("should get all from clinics", async () => {
      const expected = await knex("clinics").select();
      const res = await request.get("/clinics");
      const actual = JSON.parse(res.text);
      expect(actual[0].id).to.eq(expected[0].id);
      expect(actual.length).to.eq(expected.length);
    });
  });
  describe("post method for approved_clinics", () => {
    it("should insert a new collumn into approved_clinics table", (done) => {
      request
        .post("/approved")
        .send({
          clinic_name: "三軒茶屋メリーレディースクリニック",
          uid: "53kR3H9AWHcp7u2pQlqELzRaMz13",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });
  });
  describe("get method for approved_clinics", () => {
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
  describe("get method for saved", () => {
    it("get saved clinics from saved table", async () => {
      const expected = await knex("saved")
        .select()
        .where({ user_id: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" });
      const res = await request
        .get("/saved")
        .send({ uid: "K9ISFp2HfnTFjRvrfzq9z8ZdiZ33" });
      const actual = JSON.parse(res.text);
      expect(actual[0].user_id).to.eq(expected[0].user_id);
      expect(actual.length).to.eq(expected.length);
    });
  });
  describe("post method for approved_clinics", () => {
    it("should insert a new collumn into saved table", (done) => {
      request
        .post("/saved")
        .send({
          clinic_id: 10,
          uid: "53kR3H9AWHcp7u2pQlqELzRaMz13",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });
  });
  describe("delete method for approved_clinics", () => {
    it("should delete a collumn from saved table", (done) => {
      request
        .delete("/saved")
        .send({
          uid: "53kR3H9AWHcp7u2pQlqELzRaMz13",
          clinic_id: 10,
        })
        .end((err, res) => {
          console.log(res.status);
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });
  describe("get methods for treatments", () => {
    it("should get distinct types from treatments", async () => {
      const expected = await knex("treatments").distinct("type");
      const res = await request.get("/types");
      const actual = JSON.parse(res.text);
      console.log("expected", expected);
      console.log("actual", actual);
      // expect(actual[0].id).to.eq(expected[0].id);
      expect(actual.length).to.eq(expected.length);
    });
  });
  describe.only("get methods to get searched-clinics", () => {
    it("should get distinct clinic_id from searched-clinics", async () => {
      // const expected = await knex("treatments").distinct("type");
      const res = await request.get("/searched-clinics").send({
        PMS: true,
        ward: 14,
        女医: true,
        性感染症: false,
        月経異常: false,
        生理痛: false,
        避妊: false,
      });
      // const actual = JSON.parse(res.text);
      // console.log("expected", expected);
      // console.log("actual", actual);
      console.log("res", res.text);
      // expect(actual[0].id).to.eq(expected[0].id);
      // expect(actual).to.eq(expected);
    });
  });
  describe("get methods for types of treatments table", () => {
    it("should get clinic_id and types from treatments table", async () => {
      // const expected = await knex("treatments").distinct("type");
      const res = await request.get("/types/ids").send({ ids: [1, 2] });
      // const actual = JSON.parse(res.text);
      console.log("res", res.text);
      // expect(actual[0].id).to.eq(expected[0].id);
      // expect(actual.length).to.eq(expected.length);
    });
  });
});
