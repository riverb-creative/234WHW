/**
 * 
 * bookController.test.js
 * 
 * contain integration testing for the DB-dependent functions in the bookController.js file
 * 
 * created by River
 * 
 * 2/02/26
 */

//import required files and frameworks
const bookController = require('../controllers/bookController');
const request = require('supertest');
const mongoose = require('mongoose');
//npm install mongodb-memory-server
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../testServer');

let mongo;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
});


//testing to delete book by bookId

    //unsuccessful deletion of bookId (does not exist) - return 404
        //call the getUserByName function indirectly (integration testing)
        //we call the server file --> router file --> controller file function
        test("that the bookId DOES NOT exist", async () => {
                let bookId = '799'
                const response = await request(app)
                                    .delete('/books/' + bookId);
            expect(response.statusCode).toBe(500);
        });

        test("that the bookId exists and it is deleted", async () => {
                const createdBook = await request(app)
                                    .post("/books")
                                    .send({
                                        title: "TeSt",
                                        author: "A Test"
                                    });
                 expect(createdBook.statusCode).toBe(201);

                const bookId = createdBook.body.bookAdded._id

                console.log(bookId);
                
                const response = await request(app)
                                    .delete('/books/' + bookId);
            expect(response.statusCode).toBe(200);
        });