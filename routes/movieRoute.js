const router = require("express").Router();
const movieController = require('../controllers/movieController')
//const {isAuthenticated} = require("../utilities/authenticate");


router.get('/', movieController.getAllMovies);
router.get('/id/:id', movieController.getSingleMovieById);
router.get('/name/:movieName', movieController.getSingleMovieByName);
router.get('/genre/:genre', movieController.getMoviesByGenre);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);


module.exports = router