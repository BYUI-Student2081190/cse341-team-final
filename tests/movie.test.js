
const mockingoose = require('mockingoose');
const { getSingleMovieById, getAllMovies, getMoviesByGenre, getSingleMovieByName } = require('../controllers/movieController'); 
const mongoose = require('mongoose');
const movieSchema = require('../models/Movie');
const TestResponse = require('../utilities/test-response');  

  
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

    test('should return 200 if movies are returned.', async () => {
        const mockMovies = [{
            _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a3'),
            movieName: 'Inception',
            year: 2010,
            rating: 'PG-13',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            views: '1000000',
            length: '148 minutes'
        },
        {
            _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a4'),
            movieName: 'Test 2',
            year: 2010,
            rating: 'PG-13',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            views: '1000000',
            length: '148 minutes'
        },
        {
            _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a5'),
            movieName: 'Test 3',
            year: 2010,
            rating: 'PG-13',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            views: '1000000',
            length: '148 minutes'
        }
    ];
        // Simulate database response
        mockingoose(movieSchema).toReturn(mockMovies, 'find');

        req = 'Nothing';
        res = new TestResponse();

        await getAllMovies(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data[0]._id).toBe(mockMovies[0]._id);
        expect(res.data[0].movieName).toBe(mockMovies[0].movieName);
        expect(res.data[0].year).toBe(mockMovies[0].year);
        expect(res.data[0].rating).toBe(mockMovies[0].rating);
        expect(res.data[0].genre).toEqual(mockMovies[0].genre);
        expect(res.data[0].description).toBe(mockMovies[0].description);
        expect(res.data[0].views).toBe(mockMovies[0].views);
        expect(res.data[0].length).toBe(mockMovies[0].length);
        expect(res.data[1]._id).toBe(mockMovies[1]._id);
        expect(res.data[1].movieName).toBe(mockMovies[1].movieName);
        expect(res.data[1].year).toBe(mockMovies[1].year);
        expect(res.data[1].rating).toBe(mockMovies[1].rating);
        expect(res.data[1].genre).toEqual(mockMovies[1].genre);
        expect(res.data[1].description).toBe(mockMovies[1].description);
        expect(res.data[1].views).toBe(mockMovies[1].views);
        expect(res.data[1].length).toBe(mockMovies[1].length);
        expect(res.data[2]._id).toBe(mockMovies[2]._id);
        expect(res.data[2].movieName).toBe(mockMovies[2].movieName);
        expect(res.data[2].year).toBe(mockMovies[2].year);
        expect(res.data[2].rating).toBe(mockMovies[2].rating);
        expect(res.data[2].genre).toEqual(mockMovies[2].genre);
        expect(res.data[2].description).toBe(mockMovies[2].description);
        expect(res.data[2].views).toBe(mockMovies[2].views);
        expect(res.data[2].length).toBe(mockMovies[2].length);
    });

    test('should return 500 if an error occurs', async () => {

        mockingoose(movieSchema).toReturn(new Error('Server Error') ,'find');

        req = 'Nothing';
        res = new TestResponse();

        await getAllMovies(req, res);
        expect(res.statusCode).toBe(500);
    });

    test('should return 200 if a movie comes back', async () => {

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

        mockingoose(movieSchema).toReturn(mockMovie ,'findOne');

        req = {params:{movieName:'Inception'}};
        res = new TestResponse();

        await getSingleMovieByName(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data._id).toBe(mockMovie._id);
    });

    test('should return 404 if a movie name does not match', async () => {

        mockingoose(movieSchema).toReturn(undefined ,'findOne');

        req = {params:{movieName:'Not Matching'}};
        res = new TestResponse();

        await getSingleMovieByName(req, res);
        expect(res.statusCode).toBe(404);
    });

    test('should return 500 if a error occurs', async () => {

        mockingoose(movieSchema).toReturn(new Error('Server Error') ,'findOne');

        req = {params:{movieName:'random'}};
        res = new TestResponse();

        await getSingleMovieByName(req, res);
        expect(res.statusCode).toBe(500);
    });

    test('should return 200 if a movie comes back', async () => {

        const mockMovie = [{
            _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a3'),
            movieName: 'Inception',
            year: 2010,
            rating: 'PG-13',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            views: '1000000',
            length: '148 minutes'
        },
        {
            _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a4'),
            movieName: 'Test 2',
            year: 2010,
            rating: 'PG-13',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            views: '1000000',
            length: '148 minutes'
        },
        {
            _id: new mongoose.Types.ObjectId('6751248c88c3a0c25e80c3a5'),
            movieName: 'Test 3',
            year: 2010,
            rating: 'PG-13',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            views: '1000000',
            length: '148 minutes'
        }
    ];

        mockingoose(movieSchema).toReturn(mockMovie ,'find');

        req = {params:{genre:'Sci-Fi'}};
        res = new TestResponse();

        await getMoviesByGenre(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data[0]._id).toBe(mockMovie[0]._id);
        expect(res.data[1]._id).toBe(mockMovie[1]._id);
        expect(res.data[2]._id).toBe(mockMovie[2]._id);
    });

    test('should return 404 if a movie genre does not match', async () => {

        mockingoose(movieSchema).toReturn([] ,'find');

        req = {params:{genre:'Not Matching'}};
        res = new TestResponse();

        await getMoviesByGenre(req, res);
        expect(res.statusCode).toBe(404);
    });

    test('should return 500 if a error occurs', async () => {

        mockingoose(movieSchema).toReturn(new Error('Server Error') ,'find');

        req = {params:{genre:'random'}};
        res = new TestResponse();

        await getMoviesByGenre(req, res);
        expect(res.statusCode).toBe(500);
    });
}); 
 