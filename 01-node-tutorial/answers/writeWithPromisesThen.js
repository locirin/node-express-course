const { writeFile, readFile } = require("fs").promises;

// .then-s
writeFile("temp.txt", "This is line 1\n")
  .then(() => {
    return writeFile("temp.txt", "This is line 2\n", { flag: "a" });
  })
  .then(() => {
    return writeFile("temp.txt", "This is line 3\n", { flag: "a" });
  })
  .then(() => {
    return readFile("temp.txt", "utf8");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
