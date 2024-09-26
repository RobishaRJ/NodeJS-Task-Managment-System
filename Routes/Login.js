// =========================Import Section======================================
const express = require("express");
const routers = express.Router();
const Users = require("../Modules/Users");
const bodyParser = require("body-parser");
const JsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.API_KEY;
const bcrypt = require("bcrypt");
// =============================================================================

//? ===================Login Section====================================================
routers.post("/",JsonParser, async (req, res) => {
  const email = req.body.email;
  const Password = req.body.password;
  try {
    console.log(email); 
    console.log(req.body.password)
    const user = await Users.findOne({ where: {email } });
    console.log(user);
    verifyPassword(Password, user.password)
      .then((match) => {
        if (match === true) {
          const payload = {
            user_id: user.user_id,
            email: email,
            role:user.role,
            // Set the expiration time (exp) to 1 hour from now
            exp: Math.floor(Date.now() / 1000) + 3600, // 3600 seconds = 1 hour
          };
          const token = jwt.sign(payload, KEY);
          res.status(200).json({ Token: token });
          // Handle unexpected errors, such as database connection issues
        } else {
          // Handle incorrect password
          res
            .status(500)
            .json({ Message: "Password is incorrect. Access denied." });
        }
      })
      .catch((error) => {
        // Handle errors here if needed
        res.status(500).json("Error in Login:", error);
      });
  } catch (error) {
    res.status(500).json({ Message: "Server Error"+error });
  }
});
//? =============================================================================
async function verifyPassword(providedPassword, hashedPassword) {
  try {
    // Verify the provided password against the stored hashed password
    const match = await bcrypt.compare(providedPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Unable to verify password");
  }
}

module.exports = routers;
