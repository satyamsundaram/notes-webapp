const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (err) {
  console.log("Error connecting to MongoDB: ", err);
}

require("./config/passport")(passport); // load passport config

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/authRoutes")(app, passport);
require("./routes/apiRoutes")(app);

const port = process.env.PORT | 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
