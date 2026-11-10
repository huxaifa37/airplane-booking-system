// Flight and passenger management (Developer A).
const { load, save } = require("./storage");

function addFlight(code, origin, destination, seats, price) {
  const data = load();
  if (data.flights.some((f) => f.code === code)) {
    throw new Error(`Flight ${code} already exists`);
  }
  if (!(seats > 0) || !(price > 0)) {
    throw new Error("Seats and price must be positive");
  }
  data.flights.push({ code, origin, destination, seats, price, booked: [] });
  save(data);
  return code;
}

function listFlights() {
  return load().flights;
}

function registerPassenger(name, email) {
  if (!email.includes("@")) {
    throw new Error("Invalid email address");
  }
  const data = load();
  const id = data.passengers.length + 1;
  data.passengers.push({ id, name, email });
  save(data);
  return id;
}

async function uiAddFlight(ask) {
  const code = await ask("Flight code: ");
  addFlight(code, await ask("From: "), await ask("To: "),
    Number(await ask("Seats: ")), Number(await ask("Price: ")));
  console.log("Flight added.");
}

async function uiListFlights() {
  for (const f of listFlights()) {
    const free = f.seats - f.booked.length;
    console.log(`${f.code}  ${f.origin}->${f.destination}  free:${free}  price:${f.price}`);
  }
}

async function uiRegister(ask) {
  const id = registerPassenger(await ask("Name: "), await ask("Email: "));
  console.log("Passenger registered with ID", id);
}

module.exports = { addFlight, listFlights, registerPassenger,
  uiAddFlight, uiListFlights, uiRegister };
