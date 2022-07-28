const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  nama     : { type: String, required: true, minlength: 3, maxlength: 200 },
  author   : String,
  uid      : String,
  usia     : Number,
  jam      : String,
  tanggal  : Date,
  createdAt: { type: Date, default: new Date() },
  isDelete : { type: Boolean, default: false },

});

const Book   = mongoose.model("Book", bookSchema);
exports.Book = Book;
