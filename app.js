const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const contactRouter = require('./routes/contactRouter');

const app = express();

/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* --------------------------------- routes --------------------------------- */
app.use('/v1', contactRouter);

module.exports = app;
