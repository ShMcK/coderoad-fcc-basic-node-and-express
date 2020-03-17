const assert = require("assert");
const sinon = require("sinon");

describe("server", () => {
  // 1.2
  it('should log "Hello World"', () => {
    const spy = sinon.spy(console, "log");
    const server = require("../src/server");
    const result = spy.calledWith("Hello World");
    assert.ok(result);
    server.close();
  });
});
