const express = require('express');
const router = express.Router();
const { Applies } = require('../models');

router.post('/:id', async (req, res) => {
    const candidateId = req.params.id;
    const { jobId } = req.body;
    const found = await Applies.findOne({ where : { CandidateId : candidateId,
        JobId: jobId
     }});
     if (!found) {
        await Applies.create({ CandidateId : candidateId,
            JobId: jobId
         });
         res.status(200).json("Success");
     }
})

router.get('/check/:candidateId/:jobId', async (req, res) => {
    const candidateId = req.params.candidateId;
    const jobId = req.params.jobId;
  
    try {
      const found = await Applies.findOne({
        where: {
          CandidateId: candidateId,
          JobId: jobId,
        },
      });
      if (found) {
        res.status(200).json({ applied: true });
      } else {
        res.status(200).json({ applied: false });
      }
    } catch (error) {
      console.error('Error checking application status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;