const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.route('/contact/add').post(contactController.addNewContact);
router.route('/contact/get-all').get(contactController.getAllContacts);
router.route('/contact/get-one/:id').get(contactController.getSingleContact);
router.route('/contact/update/:id').patch(contactController.patchContact);

module.exports = router;
