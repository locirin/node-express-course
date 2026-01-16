const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log("1) connecting to MongoDB..."); //

    await connectDB(process.env.MONGO_URI);

    console.log("2) connected to MongoDB. starting server..."); //

    app.listen(port, console.log(`Server is listening on port ${port}...`));
    // app.listen(port, () =>
    //   console.log(`3) Server is listening on port ${port}...`) //
    // );
  } catch (error) {
    console.log(error);
  }
};

start(); // 1:10:36 https://www.youtube.com/watch?v=rltfdjcXjmk&t=2502s
