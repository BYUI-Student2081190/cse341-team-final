/** Required Variables **/
const express = require('express');
const router = express.Router();
const videogameController = require('../controllers/videogameController');
const isAuth = require('../utilities/authenticate');


/** Routes **/
// Select all the games in the db
router.get('/', videogameController.selectAll);
// Select a game by title
router.get('/title/:title', videogameController.selectByTitle);
// Select games by type
router.get('/type/:type', videogameController.selectByType);
// Add a new game to the collection
router.post('/', isAuth, videogameController.createVideoGameEntry);
// Update a game in the collection
router.put('/:id', isAuth, videogameController.updateVideoGameEntry);
// Delete a game in the collection
router.delete('/:id', videogameController.deleteVideoGameEntry);


/** Export **/
module.exports = router;