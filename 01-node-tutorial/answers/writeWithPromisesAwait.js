const { writeFile, readFile } = require("fs").promises;

//Writer func
const writer = async () => {
  try {
    await writeFile("temp.txt", "This is line 1\n");
    await writeFile("temp.txt", "This is line 2\n", { flag: "a" });
    await writeFile("temp.txt", "This is line 3\n", { flag: "a" });
  } catch (err) {
    console.log("Error writing file:", err);
  }
};

//Reader func
const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.log("Error reading file:", err);
  }
};

//readWrite
const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
