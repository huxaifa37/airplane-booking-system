// Seat booking and cancellation (Developer B).
const { load, save } = require("./storage");

function findFlight(data, code) {
  const flight = data.flights.find((f) => f.code === code);
  if (!flight) throw new Error(`Flight ${code} not found`);
  return flight;
}

function bookSeat(passengerId, flightCode) {
  const data = load();
  if (!data.passengers.some((p) => p.id === passengerId)) {
    throw new Error(`Passenger ${passengerId} not found`);
  }
  const flight = findFlight(data, flightCode);
  let seat = 1;
  while (flight.booked.includes(seat) && seat <= flight.seats) seat++;
  if (seat > flight.seats) throw new Error(`Flight ${flightCode} is full`);
  flight.booked.push(seat);
  const ref = "BK" + String(data.bookings.length + 1).padStart(4, "0");
  data.bookings.push({ ref, passengerId, flight: flightCode, seat,
    status: "CONFIRMED", paid: false });
  save(data);
  return ref;
}

function cancelBooking(ref) {
  const data = load();
  const booking = data.bookings.find((b) => b.ref === ref && b.status === "CONFIRMED");
  if (!booking) throw new Error(`No active booking ${ref}`);
  const flight = findFlight(data, booking.flight);
  flight.booked = flight.booked.filter((s) => s !== booking.seat);
  booking.status = "CANCELLED";
  save(data);
  return true;
}

async function uiBook(ask) {
  const ref = bookSeat(Number(await ask("Passenger ID: ")), await ask("Flight code: "));
  console.log("Booking confirmed. Reference:", ref);
}

async function uiCancel(ask) {
  cancelBooking(await ask("Booking reference: "));
  console.log("Booking cancelled.");
}

module.exports = { bookSeat, cancelBooking, uiBook, uiCancel };
