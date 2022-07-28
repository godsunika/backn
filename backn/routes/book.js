const Joi      = require("joi");
const winston  = require("winston");
const express  = require("express");
const auth     = require("../middleware/auth");
const { Book } = require("../models/book");
const router   = express.Router();

router.post("/", auth, async (req, res) => {
  const schema = Joi.object({
    nama     : Joi.string().min(3).max(200).required(),
    author   : Joi.string().min(3),
    uid      : Joi.string(),
    createdAt: Joi.date(),
    usia     : Joi.number(),
    jam      : Joi.string(),
    tanggal  : Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { nama, author, usia, jam, tanggal, createdAt, uid } = req.body;

  let book = new Book({ nama, author,  usia, jam, tanggal, createdAt, uid });

  book = await book.save();
  res.send(book);
});

module.exports = router;
