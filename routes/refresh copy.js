const Joi      = require("joi");
const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const { User } = require("../models/user");
const router   = express.Router();

router.post("/", (req, res) => {
  if (req.cookie?.jwt) {
    // Destructuring refreshToken from cookie
    console.log(req.cookie.jwt)
    const refreshToken = req.cookie.jwt;
    
        // Verifying refresh token
        jwt.verify(refreshToken, process.env.TODO_APP_JWT_REFRESH_KEY, (err, user) => {
          if (err) {
            // Wrong Refesh Token
            return res.status(406).json({ message: 'Unauthorized' });
          }
          else {
            // Correct token we send a new access token
            const accessToken = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.TODO_APP_JWT_SECRET_KEY, { expiresIn: '10m' });
            return res.json(accessToken);
          }
        })


  } else {
    return res.status(406).send({ message: 'Unauthorized' });
  }
});

module.exports = router;
