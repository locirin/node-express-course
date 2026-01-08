// instance for mongoose
const mongoose = require("mongoose");

// const connectionString = <connection url was here but now is moved to .env>

const connectDB = (url) => {
  // return mongoose.connect(connectionString)
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
