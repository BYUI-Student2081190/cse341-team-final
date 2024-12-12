const movieSchema = require('../models/Movie');
const mongoose = require('mongoose');

const getAllMovies = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movie = await movieSchema.find();
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch  movies' });
    }
};
 
const getSingleMovieByName = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const { movieName } = req.params; // Extract the movie name from the route parameter
       //const movie = await movieSchema.findOne({ movieName: movieName });
        const movie = await movieSchema.findOne({ movieName: new RegExp(`^${movieName}$`, 'i') });


        if (!movie) {
            return res.status(404).json({ error: 'Movie not found by name' });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie by name:', error.message);
        res.status(500).json({ error: 'Failed to fetch movie by name' });
    }
};

const getSingleMovieById = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const { id } = req.params; // Extract the ID from the route parameter

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid movie ID format' });
        }

        const movie = await movieSchema.findById(id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found by ID' });
        }
        res.data = movie;
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch movie by ID' });
    }
};

const getMoviesByGenre = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const { genre } = req.params; // Extract the genre from the request parameter

        // Use a case-insensitive query to find movies by genre
        const movies = await movieSchema.find({ genre: new RegExp(`^${genre}$`, 'i') });

        if (movies.length === 0) {
            return res.status(404).json({ error: 'No movies found for this genre' });
        }

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies by genre:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies by genre' });
    }
};




const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        // Create a new instance of the schema with data from the request body
        const movie = new movieSchema({
            movieName: req.body.movieName,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            description: req.body.description,
            views: req.body.views,
            length: req.body.length
        });

        // Save the document to the database
        const response = await movie.save();

        // Send the response with the created document
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating movie:', error.message);

        // Handle validation errors or other issues
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message }); // Bad Request
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the movie' });
        }
    }
};


const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movieId = req.params.id; // Mongoose will convert to ObjectId
        const updateMovieData = {
            movieName: req.body.movieName,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            description: req.body.description,
            views: req.body.views,
            length: req.body.length
        };

        const response = await movieSchema.findByIdAndUpdate(movieId, updateMovieData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the update against the schema
        });

        if (!response) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error updating movie:', error.message);
        res.status(500).json({ error: 'Some error occurred while updating the movie' });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movieId = req.params.id; // Mongoose will convert to ObjectId
        const response = await movieSchema.findByIdAndDelete(movieId);

        if (!response) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting movie:', error.message);
        res.status(500).json({ error: 'Some error occurred while deleting the movie' });
    }
};



module.exports = {getAllMovies,createMovie,updateMovie,deleteMovie,getSingleMovieByName,getSingleMovieById,getMoviesByGenre};
