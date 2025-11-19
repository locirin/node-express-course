const currentHour = new Date().getHours();

if (currentHour >= 6 && currentHour < 16) {
  console.log("Hello, have a good day");
} else {
  console.log("Good Evening");
}
