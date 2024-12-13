
const mockingoose = require('mockingoose');
const { getSingleMovieById, getAllMovies } = require('../controllers/movieController'); 
const mongoose = require('mongoose');
const movieSchema = require('../models/Movie'); 

  
describe('getSingleMovieById', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '6751248c88c3a0c25e80c3a3' } }; // Valid ObjectId
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockingoose.resetAll(); // Use resetAll to clear mock state
    });

    test('should return a movie when a valid ID is passed', async () => {
      const mockMovie = {
          _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a3'),
          movieName: 'Inception',
          year: 2010,
          rating: 'PG-13',
          genre: 'Sci-Fi',
          description: 'A mind-bending thriller',
          views: '1000000',
          length: '148 minutes',
      };
  
      mockingoose(movieSchema).toReturn(mockMovie, 'findOne');
  
      await getSingleMovieById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
              ...mockMovie,
              
          })
      );
  });

    test('should return 400 for invalid movie ID format', async () => {
        req.params.id = 'invalid-id'; // Invalid ObjectId

        await getSingleMovieById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid movie ID format' });
    });

    test('should return 404 if movie not found by ID', async () => {
        mockingoose(movieSchema).toReturn(null, 'findOne'); // Simulate no result

        await getSingleMovieById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found by ID' });
    });

    test('should return 500 if an error occurs', async () => {
        // Simulate an error by throwing in the mocked function
        mockingoose(movieSchema).toReturn(() => {
            throw new Error('Some database error');
        }, 'findOne');

        await getSingleMovieById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch movie by ID' });
    });
}); 
 