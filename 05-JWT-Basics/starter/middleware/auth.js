const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  //   console.log(req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();

    // console.log(decoded);
    // this is where we want to share secret
  } catch (error) {
    throw new UnauthenticatedError("No authorised to access this route");
  }
};

module.exports = authenticationMiddleware;
