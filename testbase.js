const fs = require("fs");
const os = require("os");
const path = require("path");
const storage = require("./storage");

// Point the storage layer at a fresh temporary file for each test.
function freshStorage() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "airline-"));
  storage.state.file = path.join(dir, "data.json");
  return storage.state.file;
}

module.exports = { freshStorage };
