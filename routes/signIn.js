const Joi          = require("joi");
const express      = require("express");
const bcrypt       = require("bcryptjs");
const jwt          = require("jsonwebtoken");
const { User }     = require("../models/user");
const router       = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email   : Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const jwtSecretKey  = process.env.TODO_APP_JWT_SECRET_KEY;
  const jwtRefreshKey = process.env.TODO_APP_JWT_REFRESH_KEY;
  const accessToken   = jwt.sign({ _id: user._id, name: user.name, email: user.email }, jwtSecretKey, { expiresIn: '1m' });
  const refreshToken  = jwt.sign({ _id: user._id, name: user.name, email: user.email }, jwtRefreshKey, { expiresIn: '3m' });

  res.cookie('refresh_token', refreshToken, { 
    // httpOnly: true,
    // sameSite: 'None',
    // secure  : true,
    maxAge  : 24 * 60 * 60 * 1000,
    // maxAge: 10000,
    // useCredentials: true
  });

  // console.log(accessToken);
  // console.log(JSON.parse(atob(accessToken.split(".")[1])));
  // console.log(JSON.parse(atob(accessToken.split(".")[1])).exp * 1000)
  // console.log(JSON.parse(atob(accessToken.split(".")[1])).exp * 1000 < Date.now())
  // console.log(refreshToken);
  res.send(accessToken);
});

module.exports = router;
