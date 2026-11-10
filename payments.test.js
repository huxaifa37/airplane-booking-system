const { test, beforeEach } = require("node:test");
const assert = require("node:assert");
const { freshStorage } = require("./testbase");
const storage = require("./storage");
const payments = require("./payments");

beforeEach(() => {
  freshStorage();
  storage.save({
    flights: [{ code: "NG101", origin: "Lagos", destination: "Abuja",
      seats: 2, price: 1000, booked: [1] }],
    passengers: [{ id: 1, name: "Ada", email: "a@m.com" }],
    bookings: [{ ref: "BK0001", passengerId: 1, flight: "NG101", seat: 1,
      status: "CONFIRMED", paid: false }],
  });
});

test("total includes tax", () => {
  assert.strictEqual(payments.calculateTotal(1000), 1075);
});

test("pay returns change", () => {
  assert.strictEqual(payments.payBooking("BK0001", 1100), 25);
});

test("insufficient payment rejected", () => {
  assert.throws(() => payments.payBooking("BK0001", 500));
});

test("double payment rejected", () => {
  payments.payBooking("BK0001", 1075);
  assert.throws(() => payments.payBooking("BK0001", 1075));
});
