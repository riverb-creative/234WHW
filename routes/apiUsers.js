/** -----------------------
 * apiUsers.js
 * 
 * define the routes (method + path) the api responds to.
 * note that each path defined here assumes that /users has been typed in
 */

//imports
const express = require('express');
const mongoose = require('mongoose');
const {body, param} = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

//Login feature
//method    =   POST 
//path      =   http://localhost:3000/users/login
//response  =   set a JWT on the client and start a session
router.post("/login", userController.loginUser);

//method    =   GET
//path      =   http://localhost:3000/users
//response  =   full list of all users in collection
router.get("/", (request, response) => {
    userController.getAllUsers(request, response);
});

//method    =   GET
//path      =   http://localhost:3000/users/:theUserName
//response  =   user data for the document that matches the username
router.get("/:theUserName", userController.getUserByName);

//method    =   POST
//path      =   http://localhost:3000/users
//response  =   add user data to collection and return success message
router.post
    ("/", 
        body("userName").trim()
            .notEmpty()
            .escape()
            .withMessage("Username is required. Please enter a username."),
        body("password").isLength({ min: 12})
            .withMessage("Password must be at least 12 characters")
            .matches(/[a-z]/)
            .withMessage("Password must have a least one lowercase letter")
            .matches(/[A-Z]/)
            .withMessage("Password must contain at least one uppercase letter")
            .matches(/[0-9]/)
            .escape()
            .withMessage("Password must contain at least one number")
            .matches(/[!@#$%^&*()]/)
            .withMessage("Password must have a least one special character"),
        body("email").trim()
            .notEmpty()
            .isEmail()
            .escape()
            .withMessage("Valid email is required"),
        userController.addNewUser
    );

//method    =   DELETE
//path      =   http://localhost:3000/users/:userId
//response  =   remove users data from collection and return success message
router.delete("/:userId", (request, response) => {
    userController.deleteUser(request, response)
});

//method    =   PUT
//path      =   http://localhost:3000/users/:userId
//response  =   edit user data to collection and return success message
router.post
    ("/:userId", 
        body("userName").trim()
            .notEmpty()
            .escape()
            .withMessage("Username is required. Please enter a username."),
        body("password").isLength({ min: 12})
            .withMessage("Password must be at least 12 characters")
            .matches(/[a-z]/)
            .withMessage("Password must have a least one lowercase letter")
            .matches(/[A-Z]/)
            .withMessage("Password must contain at least one uppercase letter")
            .matches(/[0-9]/)
            .escape()
            .withMessage("Password must contain at least one number")
            .matches(/[!@#$%^&*()]/)
            .withMessage("Password must have a least one special character"),
        body("email").trim()
            .notEmpty()
            .isEmail()
            .escape()
            .withMessage("Valid email is required"),
        userController.editUser
    );

module.exports = router;