/** Required Variables **/
const express = require('express');
const router = express.Router();


/** Routes **/
router.get('/', (req, res) => {res.json( {message: 'Hello! Welcome to the api! You are running and are connected to the db!'} )});
// Add more routes to access the other route files from the index



/** Export **/
module.exports = router;