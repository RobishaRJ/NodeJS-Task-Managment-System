const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.API_KEY;
function authMiddleware(req, res, next) {
  // Check for the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Authorization header not found
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Get the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, KEY);

    // Add the decoded token to the request object
    req.auth = decoded;

    // Call the next middleware function
    next();
  } catch (err) {
    // Token verification failed
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
