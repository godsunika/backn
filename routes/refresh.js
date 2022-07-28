const Joi      = require("joi");
const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const { User } = require("../models/user");
const router   = express.Router();

router.post("/", (req, res) => {
  if(req.body.refreshToken){
    // Destructuring refreshToken from cookie
    console.log("ini :"+req.body);
    console.log("re :"+req.body.refreshToken)
    const refreshToken = req.body.refreshToken;
    
        // Verifying refresh token
        
    const jwtSecretKey  = process.env.TODO_APP_JWT_SECRET_KEY;
    const jwtRefreshKey = process.env.TODO_APP_JWT_REFRESH_KEY;
    jwt.verify(refreshToken, jwtRefreshKey, (err, user) => {
      if (err) {
        // Wrong Refesh Token
        console.log("lha :"+err);
        return res.status(402).send({ message: err.message });
      }
      else {
        // Correct token we send a new access token
        const accessToken = jwt.sign({ _id: user._id, name: user.name, email: user.email }, jwtSecretKey, { expiresIn: '1m' });
        console.log(accessToken);
        return res.send(accessToken);
      }
    })
  } else {
    return res.status(406).send({ message: 'Unauthorized' });
  }
});

module.exports = router;
