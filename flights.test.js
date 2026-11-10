const { test, beforeEach } = require("node:test");
const assert = require("node:assert");
const { freshStorage } = require("./testbase");
const flights = require("./flights");

beforeEach(freshStorage);

test("add and list flight", () => {
  flights.addFlight("NG101", "Lagos", "Abuja", 3, 50000);
  assert.strictEqual(flights.listFlights()[0].code, "NG101");
});

test("duplicate flight rejected", () => {
  flights.addFlight("NG101", "Lagos", "Abuja", 3, 50000);
  assert.throws(() => flights.addFlight("NG101", "Lagos", "Kano", 3, 50000));
});

test("register passenger", () => {
  assert.strictEqual(flights.registerPassenger("Ada", "ada@mail.com"), 1);
});

test("bad email rejected", () => {
  assert.throws(() => flights.registerPassenger("Ada", "not-an-email"));
});
