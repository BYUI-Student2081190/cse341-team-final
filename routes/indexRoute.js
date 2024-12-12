/** Required Variables **/
const express = require('express');
const router = express.Router();


/** Routes **/
// Swagger Route
router.use('/api-docs', require('./swaggerRoute'));
// Routes to all the other routers
router.use('/books', require('./bookRoute'));
router.use('/movies', require('./movieRoute'));
router.use('/videogames', require('./videogameRoute'));
router.use('/users', require('./userRoute'));



/** Export **/
module.exports = router;