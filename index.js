const express = require('express');
const app = express();
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(cors());

const db = require('./models');

//routers
const candidateRouter = require('./routes/Candidates');
app.use('/candidates', candidateRouter);

const recruiterRouter = require('./routes/Recruiters');
app.use('/recruiters', recruiterRouter);

const jobRouter = require('./routes/Jobs');
app.use('/jobs', jobRouter);

const applyRouter = require('./routes/Applies');
app.use('/applies', applyRouter);

db.sequelize.sync()
    .then(() => {
        app.listen(8080, console.log('Server running on port 8080'))
    })
    .catch(err => console.log(err));