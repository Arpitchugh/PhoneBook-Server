const Contact = require('../models/contactModel');

exports.addNewContact = async (req, res) => {
	// get input
	const { firstName, lastName, phone, email } = req.body;

	// validate use input
	if (!firstName || !lastName || !phone) {
		return res.status(400).send({
			status: 'error',
			message: 'firstName, lastName, phone all are required',
		});
	}

	// check types of inputs
	if (
		typeof firstName !== 'string' ||
		typeof lastName !== 'string' ||
		typeof phone !== 'string' ||
		typeof email !== 'string'
	) {
		return res.status(400).send({
			status: 'error',
			message: 'typeof firstName, lastName, phone, email is not valid',
		});
	}

	// check if number already exits
	const existingNumber = await Contact.findOne({ phone: phone });

	if (existingNumber) {
		return res.status(400).send({
			status: 'error',
			message: 'phone number already exists',
		});
	}

	// add contact to database
	const newContact = await Contact.create({
		firstName: firstName,
		lastName: lastName,
		phone: phone,
		email: email,
	});

	// send respone
	res.status(201).send({
		status: 'success',
		message: 'successfully added new contact',
		data: newContact,
	});
};
