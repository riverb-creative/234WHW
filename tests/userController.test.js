/**
 * 
 * userController.test.js
 * 
 * contain integration testing for the DB-dependent functions in the userController.js file
 * 
 * created by River
 * 
 * 2/02/26
 */

//import required files and frameworks
const userController = require('../controllers/userController');
const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/requireAuth');
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

//testing addNewUser function

    //successful new user - return 201
        //call the addNewUser function indirectly
        test("that new user is created", async () => {
            const response = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test",
                                            password: "Th!s1satest1",
                                            email: "test@test.com"
                                    });
            expect(response.statusCode).toBe(201);
        });

    //unsuccessful new user

        //validator error - return 400
        //-- missing fields that are required
         test("the user's missing data do NOT create", async () => {
            const response = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test1",
                                            email: "test@twst1.com"
                                    });
            expect(response.statusCode).toBe(400);
        });
            //password is too short (needs at least 12 characters)
            test("the password being shorter than 12 characters", async () => {
            const response = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test2",
                                            password: "Th!s1s",
                                            email: "test@sample.com"
                                    });
            expect(response.statusCode).toBe(400);
        });

            //password too simple (missing lowercase, uppercase, digit, and special character)
            test("the password is missing lowercase, uppercase, digit", async () => {
            //only digits
            const response1 = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test1",
                                            password: "111111111111",
                                            email: "test@test1.com"
                                    });
            //only uppercase
            const response2 = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test2",
                                            password: "THISISATESTTT",
                                            email: "test@test2.com"
                                    });
            //only lowercase
            const response3 = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test3",
                                            password: "thisisatesttt",
                                            email: "test@test3.com"
                                    });
            //only special character
            const response4 = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test4",
                                            password: "!@#$%^&*()!@",
                                            email: "test@test4.com"
                                    });
            //uppercase and digits
            const response5 = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test5",
                                            password: "THIS!S@TESTTT",
                                            email: "test@test5.com"
                                    });
            //uppercase and lowercase
            const response6 = await request(app)
                                    .post("/users")
                                    .send({
                                            userName: "test6",
                                            password: "thissatesTTT",
                                            email: "test@test6.com"
                                    });

            expect(response2.statusCode).toBe(400);
        });

//testing find existing user by userName

    //successful userName - return 200
        //call the getUserByName function indirectly (integration testing)
        //we call the server file --> router file --> controller file function
        test("that username exist", async () => {
                const username = 'test'
                const response = await request(app)
                                    .get("/users/" + username);
            expect(response.statusCode).toBe(200);
        });

//testing to autheticate user for login

    //successful user login - 
        // 1. userName exists
        // 2. password is correct
        // 3. send JWT token
    test("that userName exists and password is correct for login", async () => {
         process.env.JWT_SECRET = "testSecret";
         const createdUser = await request(app)
                                    .post("/users")
                                    .send({
                                        userName: "TeSts",
                                        email: "blahblah@test.com",
                                        password: "ATest!gt5678"
                                    });
        expect(createdUser.statusCode).toBe(201);

    const response = await request(app)
                                    .post("/users/login")
                                    .send({
                                        userName: "TeSts",
                                        password: "ATest!gt5678"
                                    });

    expect(response.statusCode).toBe(200);
    
    });

    //unsuccessful user login - 401 error
        // 1. userName DOES NOT exists
        // 2. password is correct
        // 3. error sent
        test("the userName does not exist for login", async () => {
        const inValidUser = {
            userName: 'wrongUser',
            passwordHash: 'correctPass'
        }
            const response = await request(app)
                                    .post("/users/login")
                                    .send(inValidUser);
            expect(response.statusCode).toBe(401);
    });

    //unsuccessful user login - 401 error
        // 1. userName exists
        // 2. password is NOT correct
        // 3. error sent
        test("the username exists and password is incorrect for login", async () => {
        const inValidPass = {
            userName: 'correctUser',
            passwordHash: 'wrongPass'
        }
            const response = await request(app)
                                    .post("/users/login")
                                    .send(inValidPass);
            expect(response.statusCode).toBe(401);
    });