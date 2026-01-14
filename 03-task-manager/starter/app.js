const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware

app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  // http://localhost:3000/hello should show Task Manager App
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks' - create a new task
// app.get ('/api/v1/tasks/:id') - get single task
// app.patch('/api/v1/tasks/:id') - update task
// app.delete('/api/v1/tasks/:id') - delete task

const port = 3000;

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
