const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());
app.use(cookieParser());

module.exports = app;
