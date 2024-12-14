/** Required Variables **/
const mockingoose = require('mockingoose');
const { Types: {ObjectId} } = require('mongoose');
const Book = require('../models/Book');
const bookCon = require('../controllers/bookController');
const TestResponse = require('../utilities/test-response');


/** GET Tests **/
describe('Test Book Controller:', () => {

    afterEach(() => {
                jest.clearAllMocks();
                mockingoose.resetAll(); // Use resetAll to clear mock state
    });

    // Test 1
    it('Test getBooks: It should return a 200 status because it was successful and should return data.', async () => {

        // Create mock data to return
        const mockBooks = [
            {_id: new ObjectId('675001134384c2e792710c4b'), title: 'Test1', author: 'Mr.Test', description: 'A test book made by the mighty Mr.Test.', publisher: 'TestInc.', yearPublished: 1988, genre: ['Test', 'Information', 'Beta']}, 
            {_id: new ObjectId('675001134384c2e792710c4c'), title: 'Test2', author: 'Lady Test', description: 'A test book made by Lady Test.', publisher: 'TestInc.', yearPublished: 1998, genre: ['Test', 'Information']}, 
            {_id: new ObjectId('675001134384c2e792710c4d'), title: 'Test3', author: 'Mr.Test', description: 'A hit test book made by the mighty Mr.Test', publisher: 'TestInc.', yearPublished: 2003, genre: ['Test', 'Educational', 'Alpha']}
        ];

        // Create Mockingoose test
        mockingoose(Book).toReturn(mockBooks, 'find');

        req = 'Nothing cuz I can be nothing!';
        res = new TestResponse();

        // Now run the function
        await bookCon.getBooks(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data[0]._id).toBe(mockBooks[0]._id);
        expect(res.data[0].title).toBe(mockBooks[0].title);
        expect(res.data[0].author).toBe(mockBooks[0].author);
        expect(res.data[0].description).toBe(mockBooks[0].description);
        expect(res.data[0].publisher).toBe(mockBooks[0].publisher);
        expect(res.data[0].yearPublished).toBe(mockBooks[0].yearPublished);
        expect(res.data[0].genre).toEqual(mockBooks[0].genre);
        expect(res.data[1]._id).toBe(mockBooks[1]._id);
        expect(res.data[1].title).toBe(mockBooks[1].title);
        expect(res.data[1].author).toBe(mockBooks[1].author);
        expect(res.data[1].description).toBe(mockBooks[1].description);
        expect(res.data[1].publisher).toBe(mockBooks[1].publisher);
        expect(res.data[1].yearPublished).toBe(mockBooks[1].yearPublished);
        expect(res.data[1].genre).toEqual(mockBooks[1].genre);
        expect(res.data[2]._id).toBe(mockBooks[2]._id);
        expect(res.data[2].title).toBe(mockBooks[2].title);
        expect(res.data[2].author).toBe(mockBooks[2].author);
        expect(res.data[2].description).toBe(mockBooks[2].description);
        expect(res.data[2].publisher).toBe(mockBooks[2].publisher);
        expect(res.data[2].yearPublished).toBe(mockBooks[2].yearPublished);
        expect(res.data[2].genre).toEqual(mockBooks[2].genre);
    });

    // Test 2
    it('Test getBooks: It should return a 500 status because it should simulate a server error.', async () => {

        // Create Mockingoose test
        mockingoose(Book).toReturn(new Error('Database Error'), 'find');

        req = 'Nothing cuz I can be nothing!';
        res = new TestResponse();

        // Now run the function
        await bookCon.getBooks(req, res);
        expect(res.statusCode).toBe(500);
    });

    // Test 3
    it('Test getByTitle: It should return a 200 status because it succeeded and should return data.', async () => {

        // Create mock data to return
        const mockBook = 
            {_id:new ObjectId('675001134384c2e792710c4b'), title:'Test1', author:'Mr.Test', description:'A test book made by the mighty Mr.Test.', publisher:'TestInc.', yearPublished:1988, genre:['Test', 'Information', 'Beta']};

        // Create Mockingoose test
        mockingoose(Book).toReturn(mockBook, 'findOne');

        req = { params:{title:'Test1'} };
        res = new TestResponse();

        // Now run the function
        await bookCon.getByTitle(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data._id).toEqual(mockBook._id);
        expect(res.data.title).toBe(mockBook.title);
        expect(res.data.author).toBe(mockBook.author);
        expect(res.data.description).toBe(mockBook.description);
        expect(res.data.publisher).toBe(mockBook.publisher);
        expect(res.data.yearPublished).toBe(mockBook.yearPublished);
        expect(res.data.genre).toEqual(mockBook.genre);
    });

    // Test 4
    it('Test getByTitle: It should return a 404 status because there was no data returned from the db due to no title matching in the db.', async () => {

        // Create Mockingoose test
        mockingoose(Book).toReturn(undefined, 'findOne');

        req = { params:{title:'Test1'} };
        res = new TestResponse();

        // Now run the function
        await bookCon.getByTitle(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.data.message).toBe('Could not find the book title in the db.');
    });

    // Test 5
    it('Test getByTitle: It should return a 500 status because this should simulate a server error.', async () => {

        // Create Mockingoose test
        mockingoose(Book).toReturn(new Error('Database Error.'), 'findOne');

        req = { params:{title:'Test1'} };
        res = new TestResponse();

        // Now run the function
        await bookCon.getByTitle(req, res);
        expect(res.statusCode).toBe(500);
    });
});