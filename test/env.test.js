const assert = require("assert");
const {
  promises: { stat },
  F_OK
} = require("fs");
const path = require("path");

describe(".env", () => {
  it("should have a file", async () => {
    const filePath = path.join(process.cwd(), ".env");
    const hasEnv = await stat(filePath, F_OK, err => {
      if (err) {
        console.error(err);
        return false;
      }
      return true;
    });
    assert.ok(hasEnv);
  });
});
