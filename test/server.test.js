const assert = require("assert");
const request = require("supertest");
const server = require("../src/server");

describe("server", () => {
  // 3.1
  it('should return HTML when GET "/" is called', () => {
    return request(server)
      .get("/")
      .expect("Content-type", /html/)
      .expect(200)
      .then(response => {
        assert.ok(response.text.match(/<!DOCTYPE html>/));
      });
  });
  // 4.1
  it("should load styled html thanks to express.static middleware allowing css to load", () => {
    return request(server)
      .get("/style.css")
      .expect("Content-type", /css/)
      .expect(200)
      .then(response => {
        assert.ok(response.text.match(/body {/));
      });
  });
  // 5.1
  it('should return json from the "/json" endpoint', () => {
    return request(server)
      .get("/json")
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        assert.equal(
          response.body.message,
          "Hello json",
          'Message should be "Hello json"'
        );
      });
  });
  after(() => {
    server.close();
  });
});
