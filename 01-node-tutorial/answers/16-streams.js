const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  highWaterMark: 200,
  encoding: "utf8",
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount += 1;
  console.log("Chunk received:", chunk);
});

stream.on("end", () => {
  console.log("Finished reading file.");
  console.log("Total chunks:", chunkCount);
});

stream.on("error", (err) => {
  console.log("Stream error:", err);
});