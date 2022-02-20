// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// require route modules 
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// use the router module by specififying path and which module to use
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;
