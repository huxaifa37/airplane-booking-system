// Fare calculation and payment (Developer C).
const { load, save } = require("./storage");

const TAX_RATE = 0.075;

function calculateTotal(price) {
  return Math.round(price * (1 + TAX_RATE) * 100) / 100;
}

function payBooking(ref, amount) {
  const data = load();
  const booking = data.bookings.find((b) => b.ref === ref);
  if (!booking || booking.status !== "CONFIRMED") {
    throw new Error(`No active booking ${ref}`);
  }
  if (booking.paid) throw new Error("Booking already paid");
  const flight = data.flights.find((f) => f.code === booking.flight);
  const total = calculateTotal(flight.price);
  if (amount < total) {
    throw new Error(`Insufficient payment. Total due: ${total}`);
  }
  booking.paid = true;
  save(data);
  return Math.round((amount - total) * 100) / 100;
}

async function uiPay(ask) {
  const change = payBooking(await ask("Booking reference: "),
    Number(await ask("Amount paid: ")));
  console.log("Payment successful. Change:", change);
}

module.exports = { TAX_RATE, calculateTotal, payBooking, uiPay };
