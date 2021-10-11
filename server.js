require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.DB_URI, () => {
	app.listen(8000);
});
