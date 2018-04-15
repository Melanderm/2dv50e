const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const User = require('./routes/schema/userSchema.js');


mongoose.connect("mongodb://mongo:27017");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require('./routes/')(app, {});
app.listen(3000, () => {
  console.log('We are live on 3000');
});

app.use(session({
  path: '/',
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  maxAge: 24*60*60*1,
  store: new MongoStore({
     mongooseConnection: mongoose.connection
  })
}));
