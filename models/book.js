const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  uid      : String,
  firstName: { type: String, required: true, minlength: 3, maxlength: 200 },
  lastName : String,
  usia     : Number,
  jam      : String,
  tanggal  : Date,
  createdAt: { type: Date, default: new Date() },
  isDelete : { type: Boolean, default: false },
});

const Book   = mongoose.model("Book", bookSchema);
exports.Book = Book;
