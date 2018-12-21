const mongoose = require('mongoose');

const config = require('./config');

mongoose
  .connect(
    config.dbURL,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log('Database connection succeeded.'))
  .catch(() => console.log('Database connection failed.'));
