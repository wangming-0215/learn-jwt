const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');
const db = require('./db');
const authController = require('./Auth/AuthController');
const userController = require('./User/UserController');
const articalController = require('./Artical/ArticalController');

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/artical', articalController);

app.listen(port, host, function() {
  console.log(`Express listening on http://${host}:${port}`);
});
