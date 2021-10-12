const Contact = require('../models/contactModel');

/* ------------------------------- add contact ------------------------------ */

exports.addNewContact = async (req, res) => {
	try {
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
			typeof phone !== 'string'
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
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'internal server error',
		});
	}
};

/* ------------------------------ get all contacts ------------------------------ */

exports.getAllContacts = async (req, res) => {
	try {
		// get all contacts from db
		const contacts = await Contact.find();

		// send response
		res.status(200).send({
			status: 'success',
			data: contacts,
		});
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'internal server error',
		});
	}
};

/* --------------------------- get single contact --------------------------- */

exports.getSingleContact = async (req, res) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findById(id);

		if (!contact) {
			return res.status(400).send({
				status: 'error',
				message: 'invalid id',
			});
		}

		res.status(200).send({
			status: 'success',
			data: contact,
		});
	} catch (err) {
		res.status(400).send({
			status: 'error',
			message: 'invalid id',
		});
	}
};

/* ----------------------------- update contact ----------------------------- */

exports.patchContact = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, phone, email } = req.body;

		// validate input
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
			typeof phone !== 'string'
		) {
			return res.status(400).send({
				status: 'error',
				message: 'typeof firstName, lastName, phone, email is not valid',
			});
		}

		// update user
		const updatedUser = await Contact.findByIdAndUpdate(
			id,
			{
				firstName: firstName,
				lastName: lastName,
				phone: phone,
				email: email,
			},
			{ new: true }
		);

		res.status(200).send({
			status: 'success',
			message: 'successfully updated contact',
			data: updatedUser,
		});
	} catch (err) {
		res.status(400).send({
			status: 'error',
			message: 'invalid id',
		});
	}
};
