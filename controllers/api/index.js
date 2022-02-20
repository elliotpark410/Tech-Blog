// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// require route modules  
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// use the router module by specififying path and which module to use
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;