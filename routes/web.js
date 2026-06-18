const express = require('express');
const router = express.Router();

const Contact = require('../model/contact_details');

// Home Route
router.get('/', (req, res) => {
    res.send('Home Page');
});

// About Route
router.get('/about', (req, res) => {
    res.send('About Page');
});

// Create Contact API
router.post('/create', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedData = await newContact.save();

        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get All Contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;