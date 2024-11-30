/** Required Variables **/
const express = require('express');
const router = express.Router();


/** Routes **/
// Change this how you need it to talk to the controller
router.get('/', (req, res) => {res.json( {message: 'videogames!'} )});


/** Export **/
module.exports = router;