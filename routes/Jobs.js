const express = require('express');
const router = express.Router();
const { Jobs, Applies } = require('../models');

router.get('/', async (req, res) => {
    const listOfJobs = await Jobs.findAll();
    res.json(listOfJobs);
})

//get the no. of applicants for a particular job
router.get('/applicants', async (req, res) => {
    const listOfJobs = await Jobs.findAll({ include : [Applies] });
    res.json(listOfJobs);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const job = await Jobs.findByPk(id);
    res.json(job);
})

//get the jobs posted by a particular recruiter
router.get('/:recruiterId', async (req, res) => {
    const recruiterId = req.params.recruiterId;
    const jobs = await Jobs.findAll({ where : { RecruiterId: recruiterId }});
    res.json(jobs);
})

router.post('/', async (req, res) => {
    const job = req.body;
    await Jobs.create(job);
    res.json(job);
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { role, name, description, skills, type,
        experience, salary, location } = req.body;
    await Jobs.update(
        {
            role,
            name,
            description,
            skills,
            type,
            experience,
            salary,
            location
        },
        {
            where: { id }
        }
    )
    res.json('Updated Successfully.')
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await Jobs.destroy({
        where: {
            id: id,
        },
    });
    res.json('Deleted Successfully.');
})

module.exports = router;