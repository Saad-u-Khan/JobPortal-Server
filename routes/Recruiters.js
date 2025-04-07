const express = require('express');
const router = express.Router();
const { Recruiters } = require('../models');
const bcrypt = require('bcrypt');

//route for recruiter auth
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Recruiters.create({
            email: email,
            password: hash,
        });
        res.json("Registration successful");
    })
})

//route for recruiter login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const recruiter = await Recruiters.findOne({ where: { email: email }});
    if (!recruiter) {
        res.status(404).json({error: "Recruiter doesn't exist"});
    } else {
        bcrypt.compare(password, recruiter.password).then((match) => {
            if(!match) res.status(401).json({error: "Wrong credentials"});
            // res.json("You logged in");
            res.status(200).json(recruiter);
        });
    }
})

module.exports = router;