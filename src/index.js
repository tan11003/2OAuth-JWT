const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan')
const session = require('express-session');
const mongoose = require("mongoose");
const path = require('path')
const cookieParser = require("cookie-parser");
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const port = 3000
dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    console.log("Connected To MongoDB!!!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const route = require('./routes')

app.use(session({
  secret: 'cailonma',
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      multiply: (a, b) => a * b,
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})