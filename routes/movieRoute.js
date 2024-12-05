/** Required Variables **/
const express = require('express');
const router = express.Router();


/** Routes **/
// Change this how you need it to talk to the controller checking
router.get('/', (req, res) => {res.json( {message: 'Movies!'} )});


/** Export **/
module.exports = router;