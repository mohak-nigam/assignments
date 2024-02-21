// Middleware for handling auth
const jwt = require("jsonwebtoken");
const JWT_KEY = "my_special_key";
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const { authorization } = req.headers;

  const token = authorization.split(" ")[1];

  try {
    var decoded = jwt.verify(token, JWT_KEY);
    if (decoded.username) {
      next();
    } else {
      res.status(403).json({ error: "You are not authenticated" });
    }
  } catch (error) {
    res.status(404).send("invalid token");
  }
}

module.exports = adminMiddleware;
