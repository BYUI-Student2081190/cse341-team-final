const { Types: { ObjectId } } = require('mongoose');
const mockingoose = require('mockingoose');

const { getSingleMovieById } = require('./controllers/movieController');
const Movie = require('./models/Movie');
const TestResponse = require('./utilities/test-response');

jest.setTimeout(60000);

describe('Movie Route', () => {
    test('Get a movie by its id', async () => {
        const _movie = {
            _id: new ObjectId("6751248c88c3a0c25e80c3a3"),
            movieName: "Test",
            year: 1999,
            rating: "T",
            genre: "Romance",
            description: "Testing",
            views: "5",
            length: "1 hour"
        };

        mockingoose(Movie).toReturn(_movie, 'findById');

        const req = {
            params: {id:"6751248c88c3a0c25e80c3a3"}
        }

        const res = new TestResponse();

        await getSingleMovieById(req, res)
        // expect(res.statusCode).toEqual(200)
        expect(res.data).toEqual(_movie)
    });
});