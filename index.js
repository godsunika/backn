const cors         = require("cors");
const winston      = require("winston");
const express      = require("express");
const mongoose     = require("mongoose");
const bodyParser   = require('body-parser');
const cookieparser = require('cookie-parser');
const todos        = require("./routes/todos");
const signUp       = require("./routes/signUp");
const signIn       = require("./routes/signIn");
const refresh      = require("./routes/refresh");
const book      = require("./routes/book");

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyprint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

require("dotenv").config();

const app = express();

const corsOptions ={
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:3001'], 
  // origin: '*',
  // methods: '*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  // exposedHeaders: ["set-cookie"],
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieparser());

app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);
app.use("/api/refresh", refresh);
app.use("/api/book", book);

app.get("/", (req, res) => {
  res.send("welcome to the todos api...");
});

const uri  = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser   : true,
    useCreateIndex    : true,
    useUnifiedTopology: true,
    useFindAndModify  : false,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
