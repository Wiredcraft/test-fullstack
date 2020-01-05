import request from "supertest";
import app from "../index";

jest.mock("./talks");

describe("GET /talks", function() {
  it("responds with json", function(done) {
    request(app)
      .get("/talks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.success).toBe(true);
        expect(body.result.length).toBeGreaterThan(0);
        body.result.forEach((item: any) => {
          expect(item.isVoted).toBeDefined();
        });
        done();
      });
  });
});

describe("POST /talks", function() {
  it("responds with json", function(done) {
    request(app)
      .post("/talks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.success).toBe(true);
        expect(body.result.length).toBeGreaterThan(0);
        body.result.forEach((item: any) => {
          expect(item.isVoted).toBeDefined();
        });
        done();
      });
  });
});

describe("PATCH /talks", function() {
  it("responds with json", function(done) {
    request(app)
      .patch("/talks")
      .send({ isVoted: true })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.success).toBe(true);
        done();
      });
  });
});
