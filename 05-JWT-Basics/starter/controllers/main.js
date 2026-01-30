// check username, password in post(login) request (avail in req.body). Only if both values are provided, we get back token, otherwise error
// if exist create new JWT (only after we get the token we can create a successful get request)
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi (package)
  // checking in the controller for username and pwd

  if (!username || !password) {
    // if the username or password are not provided -> issue this error
    throw new BadRequestError("Please provide email and password");
  }
  // for demo only, normally provided by DB!
  const id = new Date().getDate();

  //  we want to create a token using .sign method
  // just for demo, in production use long, complex and unguessable string value!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  //   console.log(req.headers);
  //   const authHeader = req.headers.authorization;

  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     throw new CustomAPIError("No token provided", 401);
  //   }

  //   const token = authHeader.split(" ")[1];
  //   console.log(token);

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     console.log(decoded);
  //     // this is where we want to share secret
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
  //   } catch (error) {
  //     throw new CustomAPIError("No authorised to access this route", 401);
  //   }
};

module.exports = {
  login,
  dashboard,
};
