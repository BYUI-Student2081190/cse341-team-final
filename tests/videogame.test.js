/** Required Variables **/
const mockingoose = require('mockingoose');
const { Types: {ObjectId} } = require('mongoose');
const Videogame = require('../models/Videogame');
const vgCon = require('../controllers/videogameController');
const TestResponse = require('../utilities/test-response');


/** GET Tests **/
describe('Test the Videogame Controller:', () => {

    // This was obtained from the movie tests.
    // This really helps clear out every run, and allows multiple
    // tests to go through.
    afterEach(() => {
        jest.clearAllMocks();
        mockingoose.resetAll(); // Use resetAll to clear mock state
    });

    // Test 1
    test('Test selectAll: It should return a 200 status because the function could run and data was returned.', async () => {
        
        // Create mock objects to send into the mock db
        const mockGames = 
        [
            {_id: new ObjectId('675001134384c2e792710c4b'), title: 'Test1', descript: 'Test1 Rocks!', publisher: 'TestCo.', developer: 'TestCo.', gameType: ['Test', 'Beta', 'Awesome'], ageRating: 'T for Test', numOfPlayers: '3 Players'},
            {_id: new ObjectId('675001134384c2e792710c5b'), title: 'Test2', descript: 'Test2 is Rad!', publisher: 'TestCo.', developer: 'TestCo.', gameType: ['Alpha', 'Beta', 'Cool'], ageRating: 'T for Test', numOfPlayers: '5 Players'},
            {_id: new ObjectId('675001134384c2e792710c5b'), title: 'Test3', descript: 'Test3 is the Bomb!', publisher: 'TestCo.', developer: 'TestCo.', gameType: ['Alpha', 'Rad', 'Yes'], ageRating: 'T for Test', numOfPlayers: '1 Player'}
        ];

        // Find is used here to signify what type of mongoose
        // search is being done. Do we want many 'find' or
        // only one return 'findOne'.
        mockingoose(Videogame).toReturn(mockGames, 'find');

        // Run the function
        // Req can equal this because it does nothing
        // in the function
        const req = undefined;
        const res = new TestResponse();
        await vgCon.selectAll(req, res);
        // Test the status code
        expect(res.statusCode).toBe(200);
        // Now run all the return values to see if they line up
        // Object 1:
        expect(res.data[0]._id).toEqual(mockGames[0]._id);
        expect(res.data[0].title).toEqual(mockGames[0].title);
        expect(res.data[0].descript).toEqual(mockGames[0].descript);
        expect(res.data[0].publisher).toEqual(mockGames[0].publisher);
        expect(res.data[0].developer).toEqual(mockGames[0].developer);
        expect(res.data[0].gameType).toEqual(mockGames[0].gameType);
        expect(res.data[0].ageRating).toEqual(mockGames[0].ageRating);
        expect(res.data[0].numOfPlayers).toEqual(mockGames[0].numOfPlayers);
        // Object 2:
        expect(res.data[1]._id).toEqual(mockGames[1]._id);
        expect(res.data[1].title).toEqual(mockGames[1].title);
        expect(res.data[1].descript).toEqual(mockGames[1].descript);
        expect(res.data[1].publisher).toEqual(mockGames[1].publisher);
        expect(res.data[1].developer).toEqual(mockGames[1].developer);
        expect(res.data[1].gameType).toEqual(mockGames[1].gameType);
        expect(res.data[1].ageRating).toEqual(mockGames[1].ageRating);
        expect(res.data[1].numOfPlayers).toEqual(mockGames[1].numOfPlayers);
    });

    // Test 2
    test('Test selectAll: Should return a 500 status, and only error message comes back.', async () => {

        // Use mongoose to simulate a server error
        mockingoose(Videogame).toReturn(new Error('Database error.'), 'find');

        const req = 'I can be nothing...';
        const res = new TestResponse();

        await vgCon.selectAll(req, res);
        expect(res.statusCode).toBe(500);
    });

    // Test 3
    test('Test selectByTitle: Should return a 200 status, and data matching title searched.', async () => {

        const mockGame = 
            {_id: new ObjectId('675001134384c2e792710c4b'), title: 'Test1', descript: 'Test1 Rocks!', publisher: 'TestCo.', developer: 'TestCo.', gameType: ['Test', 'Beta', 'Awesome'], ageRating: 'T for Test', numOfPlayers: '3 Players'};

        mockingoose(Videogame).toReturn(mockGame, 'findOne');

        const req = {params:{title: 'Test1'}};
        const res = new TestResponse();

        await vgCon.selectByTitle(req, res);
        expect(res.statusCode).toBe(200);
        // This is enough to let us know the data is the same
        expect(res.data.title).toEqual(mockGame.title);
    });

    // Test 4
    test('Test selectByTitle: Should return a 404 status, because title is not found.', async () => {
        
        // Use mockingoose to reqreate the db response
        mockingoose(Videogame).toReturn(undefined, 'findOne');

        // Pass in a false value to see if it can be found
        const req = {params:{title: 'Not A Valid Title'}};
        const res = new TestResponse();

        await vgCon.selectByTitle(req, res);
        expect(res.statusCode).toBe(404);
    });

    // Test 5
    test('Test selectByTitle: Should return a 500 status, and only error message comes back.', async () => {

        // Use mongoose to simulate a server error
        mockingoose(Videogame).toReturn(new Error('Database error.'), 'findOne');

        const req = {params:{title: new Error('database error')}};
        const res = new TestResponse();

        await vgCon.selectByTitle(req, res);
        expect(res.statusCode).toBe(500);
    });

    // Test 6
    test('Test selectByType: Should return a 200 status, and should return data with matching types.', async () => {
        
        const mockGames = 
        [
            {_id: new ObjectId('675001134384c2e792710c4b'), title: 'Test1', descript: 'Test1 Rocks!', publisher: 'TestCo.', developer: 'TestCo.', gameType: ['Test', 'Beta', 'Awesome'], ageRating: 'T for Test', numOfPlayers: '3 Players'},
            {_id: new ObjectId('675001134384c2e792710c5b'), title: 'Test2', descript: 'Test2 is Rad!', publisher: 'TestCo.', developer: 'TestCo.', gameType: ['Alpha', 'Beta', 'Cool'], ageRating: 'T for Test', numOfPlayers: '5 Players'}
        ];

        mockingoose(Videogame).toReturn(mockGames, 'find');

        const req = {params:{type: 'Beta'}};
        const res = new TestResponse();

        await vgCon.selectByType(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data[0].gameType[1]).toEqual(mockGames[0].gameType[1]);
        expect(res.data[1].gameType[1]).toEqual(mockGames[1].gameType[1]);
    });

    // Test 7
    test('Test selectByType: Should return a 404 status, and should not return data just an error message.', async () => {
        
        // Mockingoose creates a empty list to simulate the response
        mockingoose(Videogame).toReturn([], 'find');

        // Pass in bad data for the reaction

        const req = {params:{type: 'Not valid'}};
        const res = new TestResponse();

        await vgCon.selectByType(req, res);
        expect(res.statusCode).toBe(404);
    });

    // Test 8
    test('Test selectByType: Should return a 500 status, and only error message comes back.', async () => {

        // Use mongoose to simulate a server error
        mockingoose(Videogame).toReturn(new Error('Database error.'), 'find');

        const req = {params:{type: new Error('database error')}};
        const res = new TestResponse();

        await vgCon.selectByType(req, res);
        expect(res.statusCode).toBe(500);
    });
});