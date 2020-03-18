const assert = require("assert");
const {
  promises: { stat, readFile },
  F_OK
} = require("fs");
const path = require("path");

describe(".env", () => {
  const filePath = path.join(process.cwd(), ".env");
  it("should have a file", async () => {
    const hasEnv = await stat(filePath, F_OK, err => {
      if (err) {
        console.error(err);
        return false;
      }
      return true;
    });
    assert.ok(hasEnv);
  });
  // 6.2
  it("should be ignored in the .gitignore file", async () => {
    const gitIgnorePath = path.join(process.cwd(), ".gitignore");
    const gitIgnoreFile = await readFile(gitIgnorePath, "utf8");
    const lines = gitIgnoreFile.split("\n");
    let hasMatch = false;
    for (const line of lines) {
      if (line.match(/^.env/)) {
        hasMatch = true;
      }
    }
    assert.ok(hasMatch, ".env is not added to the .gitignore file");
  });
  // 6.3
  it('should have the key MESSAGE_STYLE with a value "uppercase"', async () => {
    const envFile = await readFile(filePath, "utf8");
    const lines = envFile.split("\n");
    let hasMatch = false;
    for (const line of lines) {
      if (line.match(/^MESSAGE_STYLE/)) {
        hasMatch = !!line.match(/(\"\')?uppercase(\"\')?/);
      }
    }
    assert.ok(hasMatch, 'MESSAGE_STYLE should equal "uppercase"');
  });
});
