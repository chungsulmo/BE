const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require("express-session");
const cors = require("cors");
const port = 8000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const authRouter = require('./routes/auth');

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'COOKIE_SECRET',
    cookie: {
      httpOnly: true,
      secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log("Server Port : ", port);
});