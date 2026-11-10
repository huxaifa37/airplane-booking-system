// Airplane Booking Management System - entry point.
const readline = require("readline");
const flights = require("./flights");
const bookings = require("./bookings");
const payments = require("./payments");

const MENU = `
=== Airplane Booking Management System ===
1. Add flight
2. List flights
3. Register passenger
4. Book seat
5. Cancel booking
6. Pay for booking
0. Exit
`;

const HANDLERS = {
  "1": flights.uiAddFlight,
  "2": flights.uiListFlights,
  "3": flights.uiRegister,
  "4": bookings.uiBook,
  "5": bookings.uiCancel,
  "6": payments.uiPay,
};

function createAsk() {
  const rl = readline.createInterface({ input: process.stdin });
  const lines = rl[Symbol.asyncIterator]();
  const ask = async (question) => {
    process.stdout.write(question);
    const { value, done } = await lines.next();
    return done ? null : value;
  };
  return { ask, close: () => rl.close() };
}

async function main() {
  const { ask, close } = createAsk();
  while (true) {
    console.log(MENU);
    const choice = ((await ask("Choose: ")) ?? "0").trim();
    if (choice === "0") break;
    const handler = HANDLERS[choice];
    try {
      if (handler) await handler(ask);
      else console.log("Invalid choice");
    } catch (err) {
      console.log("Error:", err.message);
    }
  }
  close();
}

if (require.main === module) main();
