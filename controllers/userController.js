/**-----------------------------
 * userController.js 
 * 
 * define all the functions needed to interact with the user collection
 * in our database 
 * ----------------------------- */ 

//imports
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//login - authenticate a user and return a JWT
exports.loginUser = async(request, response) => {
    try {
        //check if username exists in database - return status/msg if not
        const theUser = await User.findOne({ userName: request.body.userName });
        if (!theUser) {
            return response.status(401).json({ message: "Username or password incorrect"});
        }

        //otherwise, continue and check if hashed password value matches the stored result
        const passwordMatch = await bcrypt.compare(
            request.body.password,
            theUser.passwordHash
        );

        //if not, return appropriate status/message
        if(!passwordMatch) {
           return response.status(401).json({ message: "Username or password incorrect"});
        }

        //At this point in code, both username & password are good, so we start building the JWT
        const token = jwt.sign(
            {
                id: theUser._id,
                userName: theUser.userName
            },
            process.env.JWT_SECRET,
            { expiresIn: "0.58h"}
        );

        response.status(200).json({ token });
    }
    catch (errorMsg) {
        response.status(500).json({
            error: "Login failed. Please try again with correct credentials." + errorMsg
        });
    }
}

//get the whole collection of users
exports.getAllUsers = async (request, response) => {
    try {
        const users = await User.find({}, {userName: 1, email: 1, createdAt: true});
        response.status(200).json(users);
    }
    catch (errMsg) {
        response.status(500).json({ error: "Server error: " + errMsg});
    }
}

//get a single user record from a username
exports.getUserByName = async(request, response) => {
    //retrieve the userName from the URL parameter "theUserName"
    const theUserName = request.params.theUserName;

    //use that value inside the find method to find just the one record that matches
    try {
        const users = await User.find({userName: theUserName});
        response.status(200).json(users);
    }
    catch (errMsg) {
        response.status(404).json({ error: "Server error: " + errMsg});
    }
}

//add a new record
exports.addNewUser = async (request, response) => {
    //we need get all the new user data
    //the information that we need is going to be in the request BODY
    //first verify that no express validator errors appeared
    const errors = validationResult(request);

    //if there are errors, reject the request and return an array of error messages
    //note that the 400 status code means "Bad Request"
    if(!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    //if there are no validator errors, attempt database stuff
    try {
        //check if the username has already been taken - if so, send a "Request Conflict"
        //status and message
        const userExists = await User.findOne({ userName: request.body.userName });

        if (userExists) {
            return response.status(409).json({ message: "username already exists" });
        }

        //Otherwise, hash the password
        const passwordHash = await bcrypt.hash(request.body.password, 10);

        //And then create user
        const myUser = await User.create({
            userName: request.body.userName,
            email: request.body.email,
            passwordHash,
        });

        //Respond with a "Created" status and JSON data pulled from new record
        response.status(201).json({ message: "Success", 
                                    id: myUser._id, 
                                    userName: myUser.userName,
                                    email: myUser.email,
                                    createdAt: myUser.createdAt
                                });

    }
    catch (errorMsg) {
        response.status(500).json({ error: "Failed to create user" });
    }

}


//delete a user by id
exports.deleteUser = async(request, response) => {
    const theId = request.params.userId;
    try {
        const userResult = await User.findByIdAndDelete(theId);
        response.status(200).json({message: "success", userDeleted: userResult});
    }
    catch (errMsg) {
        response.status(500).json({message: "failure", error: errMsg});
    }
}

//edit a user by id
exports.editUser = async(request, response) => {
    const theId = request.params.userId;
    const updatedUser = request.body;
    try {
        const userResult = await User.findByIdAndUpdate(theId, updatedUser,
                                                    {new: true,       // return updated document
                                                     runValidators: true});
        response.status(200).json({message: "success", userUpdated: userResult});
    }
    catch (errMsg) {
        response.status(500).json({message: "failure", error: errMsg});
    }
}