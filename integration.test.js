const { test, beforeEach } = require("node:test");
const assert = require("node:assert");
const { freshStorage } = require("./testbase");
const flights = require("./flights");
const bookings = require("./bookings");
const payments = require("./payments");

beforeEach(freshStorage);

test("register, book and pay (full flow)", () => {
  flights.addFlight("NG202", "Lagos", "Kano", 5, 2000);
  const id = flights.registerPassenger("Ada", "ada@mail.com");
  const ref = bookings.bookSeat(id, "NG202");
  assert.strictEqual(payments.payBooking(ref, 2200), 50);
});
