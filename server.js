const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
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

app.use(cookieSession({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
});

app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/authRoutes")(app, passport);
require("./routes/apiRoutes")(app);

const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
