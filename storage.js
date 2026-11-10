// JSON persistence layer shared by all modules.
const fs = require("fs");

const state = { file: process.env.AIRLINE_DATA || "data.json" };

function load() {
  if (!fs.existsSync(state.file)) {
    return { flights: [], passengers: [], bookings: [] };
  }
  return JSON.parse(fs.readFileSync(state.file, "utf8"));
}

function save(data) {
  fs.writeFileSync(state.file, JSON.stringify(data, null, 2));
}

module.exports = { state, load, save };
