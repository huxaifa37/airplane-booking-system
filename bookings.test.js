const { test, beforeEach } = require("node:test");
const assert = require("node:assert");
const { freshStorage } = require("./testbase");
const flights = require("./flights");
const bookings = require("./bookings");

beforeEach(() => {
  freshStorage();
  flights.addFlight("NG101", "Lagos", "Abuja", 2, 50000);
  flights.registerPassenger("Ada", "ada@mail.com");
  flights.registerPassenger("Bayo", "bayo@mail.com");
});

test("book assigns first free seat", () => {
  bookings.bookSeat(1, "NG101");
  assert.deepStrictEqual(flights.listFlights()[0].booked, [1]);
});

test("full flight rejected", () => {
  bookings.bookSeat(1, "NG101");
  bookings.bookSeat(2, "NG101");
  assert.throws(() => bookings.bookSeat(1, "NG101"));
});

test("cancel frees seat", () => {
  const ref = bookings.bookSeat(1, "NG101");
  bookings.cancelBooking(ref);
  assert.deepStrictEqual(flights.listFlights()[0].booked, []);
});

test("unknown passenger rejected", () => {
  assert.throws(() => bookings.bookSeat(99, "NG101"));
});
