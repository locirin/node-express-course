const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (myCat) => {
  console.log("Hello,", myCat, "come and get your treat");
});

emitter.on("status", (code, message) => {
  console.log("Status event:", code, message);
});

emitter.emit("greet", "Simone");
emitter.emit("greet", "Sebastian");
emitter.emit("status", 200, "OK");

setInterval(() => {
  emitter.emit("greet", "from timer");
}, 3000);
