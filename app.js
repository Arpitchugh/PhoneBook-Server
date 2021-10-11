const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

/* ------------------------------- middlewares ------------------------------ */
app.use(bodyParser.json());
app.use(cors());

module.exports = app;
