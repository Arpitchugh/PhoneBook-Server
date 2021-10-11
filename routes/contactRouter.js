const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.route('/contact/add').post(contactController.addNewContact);
router.route('/contact/get-all').get(contactController.getAllContacts);

module.exports = router;
