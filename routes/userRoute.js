/** Required Variables **/
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const isAuth = require('../utilities/authenticate');


/** Routes **/
// Get all users in the db
router.get('/', controller.getUsers);
// Find the user by id
router.get('/:id', controller.getOneUser);


// Add a new user
router.post('/', isAuth, controller.addUser);

// Update a user using userId
router.put('/:id', isAuth, controller.updateUser);

// Delete a user using userId
router.delete('/:id', controller.deleteUser);

/** Export **/
module.exports = router;