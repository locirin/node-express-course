const { writeFileSync, readFileSync } = require("fs");
writeFileSync("./temporary/fileA.txt", "Line 1\n");
writeFileSync("./temporary/fileA.txt", "Line 2\n", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "Line 3\n", { flag: "a" });
const syncData = readFileSync("./temporary/fileA.txt", "utf8");
console.log(syncData);
