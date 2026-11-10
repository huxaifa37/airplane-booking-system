const { test, beforeEach } = require("node:test");
const assert = require("node:assert");
const { freshStorage } = require("./testbase");
const storage = require("./storage");
const flights = require("./flights");
const bookings = require("./bookings");

beforeEach(freshStorage);

test("no duplicate seat after cancellation", () => {
  flights.addFlight("NG101", "Lagos", "Abuja", 2, 50000);
  flights.registerPassenger("Ada", "ada@mail.com");
  const first = bookings.bookSeat(1, "NG101");
  bookings.bookSeat(1, "NG101");
  bookings.cancelBooking(first);
  bookings.bookSeat(1, "NG101");
  const seats = storage.load().bookings
    .filter((b) => b.status === "CONFIRMED").map((b) => b.seat);
  assert.strictEqual(new Set(seats).size, seats.length);
});
