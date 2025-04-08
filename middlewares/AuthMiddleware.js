const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid authorization header' });
  }

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const validToken = verify(accessToken, "secret");
    req.user = validToken; 
    req.role = validToken.role; 
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};


// const validateRecruiter = (req, res, next) => {
//     if (!req.user || !req.role) {
//       return res.status(401).json({ error: 'Recruiter not logged in' });
//     }
  
//     if (req.role === 'recruiter') {
//       return next();
//     } else {
//       return res.status(403).json({ error: 'Forbidden. Only recruiters can access this route.' });
//     }
//   };
  
//   const validateCandidate = (req, res, next) => {
//     if (!req.user || !req.role) {
//       return res.status(401).json({ error: 'Candidate not logged in' });
//     }
  
//     if (req.role === 'candidate') {
//       return next();
//     } else {
//       return res.status(403).json({ error: 'Forbidden. Only candidates can access this route.' });
//     }
//   };

//   const validateRecruiterOrCandidate = (req, res, next) => {
//     if (!req.user || !req.role) {
//       return res.status(401).json({ error: 'User not logged in' });
//     }
  
//     if (req.role === 'recruiter' || req.role === 'candidate') {
//       return next();
//     } else {
//       return res.status(403).json({ error: 'Forbidden. Only recruiters or candidates can access this route.' });
//     }
//   };

// Middleware to authorize candidates
const authorizeCandidate = (req, res, next) => {
  const { id } = req.params; // Extract candidate ID from route
  if (req.user.role === 'candidate' && req.user.id !== parseInt(id)) {
    return res.status(403).json({ error: 'Forbidden. You can only access your own data.' });
  }
  next();
};

// Middleware to authorize recruiters
const authorizeRecruiter = (req, res, next) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ error: 'Forbidden. Only recruiters can access this route.' });
  }
  next();
};
  
  

module.exports = { validateToken, authorizeRecruiter, authorizeCandidate };
