const express = require('express');
const router = express.Router();
const { Candidates } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const { validateToken, 
        authorizeCandidate,
        authorizeRecruiter
         } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, authorizeRecruiter, async (req, res) => {
    const listOfCandidates = await Candidates.findAll();
    res.json(listOfCandidates);
  });
  
  router.get('/:id', validateToken, authorizeCandidate, async (req, res) => {
    const id = req.params.id;
    const candidate = await Candidates.findByPk(id);
    res.json(candidate);
  });

  router.get('/:id', validateToken, authorizeRecruiter, async (req, res) => {
    const id = req.params.id;
    const candidate = await Candidates.findByPk(id);
    res.json(candidate);
  });
  

//route for candidate auth
router.post('/auth', async (req, res) => {
    const { email, password, name, contact, qualification, skills, experience, location } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Candidates.create({
            email: email,
            password: hash,
            name: name,
            contact: contact,
            qualification: qualification,
            skills: skills,
            experience: experience,
            location: location
        });
        res.json("Candidate registration successful");
    })
})

//route for candidate login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const candidate = await Candidates.findOne({ where: { email: email }});
    if (!candidate) {
        res.status(404).json({error: "Candidate doesn't exist"});
    } else {
        bcrypt.compare(password, candidate.password).then((match) => {
            if(!match) res.status(401).json({error: "Wrong credentials"});
            // res.json("You logged in");
            const accessToken = sign({id: candidate.id, role: "candidate"}, "secret");
            res.status(200).json({accessToken});
        });
    }
})

router.put('/:id', validateToken, authorizeCandidate, async (req, res) => {
    const id = req.params.id;
    const { name, contact, qualification,
        skills, experience, location } = req.body;
    await Candidates.update(
        {
            name,
            contact,
            qualification,
            skills,
            experience,
            location
        },
        {
            where: { id }
        }
    )
    res.json('Updated Successfully.')
})

router.put('/:id', validateToken, authorizeRecruiter, async (req, res) => {
    const id = req.params.id;
    const { name, contact, qualification,
        skills, experience, location } = req.body;
    await Candidates.update(
        {
            name,
            contact,
            qualification,
            skills,
            experience,
            location
        },
        {
            where: { id }
        }
    )
    res.json('Updated Successfully.')
})

router.delete('/:id', validateToken, authorizeRecruiter, async(req, res) => {
    const id = req.params.id;
    await Candidates.destroy({
        where: {
            id: id,
        },
    });
    res.json('Deleted Successfully.');
})

module.exports = router;