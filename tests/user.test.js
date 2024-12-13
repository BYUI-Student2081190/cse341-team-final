/** Required Variables **/
const mockingoose = require('mockingoose');
const { Types: {ObjectId} } = require('mongoose');
const User = require('../models/User');
const userCon = require('../controllers/userController');
const TestResponse = require('../utilities/test-response');


/** GET Tests **/
describe('Test the Users Controller:', () => {

    afterEach(() => {
            jest.clearAllMocks();
            mockingoose.resetAll(); // Use resetAll to clear mock state
    });

    // Test 1
    test('Test getUsers: It should return a 200 status because it was successful, and it should return data.', async () => {
        // Create some mock users to send into the db
        const mockUsers = [
            {_id: new ObjectId('675001134384c2e792710c4b'), username: 'test1iscool', favColor: 'red', bio: 'I am a test, nothing more and nothing less.'},
            {_id: new ObjectId('675001134384c2e792710c5b'), username: 'test2isamazing', favColor: 'blue', bio: 'I make sure your program works.'},
            {_id: new ObjectId('675001134384c2e792710c6b'), username: 'test3isOnTopOfTheWorld', favColor: 'yellow', bio: 'I am the best, what else should I say?'}
        ];

        // Create a mockingoose test
        mockingoose(User).toReturn(mockUsers, 'find');

        const req = 'Nothing because I can be nothing';
        const res = new TestResponse();

        // Call the function and test the result
        await userCon.getUsers(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data[0]._id).toEqual(mockUsers[0]._id);
        expect(res.data[0].username).toEqual(mockUsers[0].username);
        expect(res.data[0].favColor).toEqual(mockUsers[0].favColor);
        expect(res.data[0].bio).toEqual(mockUsers[0].bio);
        expect(res.data[1]._id).toEqual(mockUsers[1]._id);
        expect(res.data[1].username).toEqual(mockUsers[1].username);
        expect(res.data[1].favColor).toEqual(mockUsers[1].favColor);
        expect(res.data[1].bio).toEqual(mockUsers[1].bio);
        expect(res.data[2]._id).toEqual(mockUsers[2]._id);
        expect(res.data[2].username).toEqual(mockUsers[2].username);
        expect(res.data[2].favColor).toEqual(mockUsers[2].favColor);
        expect(res.data[2].bio).toEqual(mockUsers[2].bio);
    });

    // Test 2
    test('Test getUsers: It should return a 500 status because of a simulated server error.', async () => {

        // Simulate a server error
        mockingoose(User).toReturn(new Error('database error.'), 'find');

        const req = 'Nothing because I can be nothing';
        const res = new TestResponse();

        // Call the function and test the result
        await userCon.getUsers(req, res);
        expect(res.statusCode).toBe(500);
    });

    // Test 3
    test('Test getOneUser: It should return a 200 status because it was successful, and it should return data.', async () => {
        // Create some mock users to send into the db
        const mockUser = 
            {_id: new ObjectId('675001134384c2e792710c4b'), username: 'test1iscool', favColor: 'red', bio: 'I am a test, nothing more and nothing less.'};

        // Create a mockingoose test
        mockingoose(User).toReturn(mockUser, 'findOne');

        const req = { params:{id:'675001134384c2e792710c4b'} };
        const res = new TestResponse();

        // Call the function and test the result
        await userCon.getOneUser(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data._id).toEqual(mockUser._id);
        expect(res.data.username).toEqual(mockUser.username);
        expect(res.data.favColor).toEqual(mockUser.favColor);
        expect(res.data.bio).toEqual(mockUser.bio);
    });

    // Test 4
    test('Test getOneUser: It should return a 404 status because it could not find the id.', async () => {

        // Use mockingoose to create a response of nothing coming back
        mockingoose(User).toReturn(undefined, 'findOne');

        // Send in a false id to see if we get a 404
        const req = { params:{id:'I am not a valid working id and no one should have me...'} };
        const res = new TestResponse();

        // Call the function and test the result
        await userCon.getOneUser(req, res);
        expect(res.statusCode).toBe(404);
    });

    // Test 5
    test('Test getOneUser: It should return a 500 status because of a server error.', async () => {

        // Use mockingoose to simulate a server error
        mockingoose(User).toReturn(new Error('database error'), 'findOne');

        // Make this a valid id so we can see if the error is picked
        // up by the function
        const req = { params:{id:'675001134384c2e792710c4b'} };
        const res = new TestResponse();

        // Call the function and test the result
        await userCon.getOneUser(req, res);
        expect(res.statusCode).toBe(500);
    });

});