/** Required Variables **/
const mockingoose = require('mockingoose');
const { Types: {ObjectId} } = require('mongoose');
const Movie = require('../models/Movie');
const movieCon = require('../controllers/movieController');
const TestResponse = require('../utilities/test-response');

describe('Movie model', () => {
  test('Find a single movie by id', async () => {
    const mockMovie = {
            movieName: "Test",
            year: 1999,
            rating: "T",
            genre: "Romance",
            description: "Testing",
            views: "5",
            length: "1 hour",
            _id: new ObjectId("6751248c88c3a0c25e80c3a3")
        };

    mockingoose(Movie).toReturn(mockMovie, 'findOne');
    
    let req = {params:{id:'6751248c88c3a0c25e80c3a3'}}
    let res = new TestResponse;
    await movieCon.getSingleMovieById(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data._id).toEqual(mockMovie._id);
    expect(res.data.movieName).toEqual(mockMovie.movieName);
    expect(res.data.year).toEqual(mockMovie.year);
    expect(res.data.rating).toEqual(mockMovie.rating);
    expect(res.data.genre).toEqual(mockMovie.genre);
    expect(res.data.description).toEqual(mockMovie.description);
    expect(res.data.views).toEqual(mockMovie.views);
    expect(res.data.length).toEqual(mockMovie.length);
  });
});