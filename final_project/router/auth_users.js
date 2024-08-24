const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//Check if user already exists in users
const isValid = (username)=>{
 // Get user already in users with the same username
 const userwithsamename = users.find(user => user.username == username);
 return userwithsamename != undefined;
}

//Check if user is authenticated
const authenticatedUser = (username,password)=>{
// Get user already in users with his credentials
 const userauthenticated = users.find(user => user.username == username && user.password == password);
 return userauthenticated != undefined;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Extract user's credentials from url body
    const { username, password} = req.body;

    //Check if user is authenticated
    if(authenticatedUser(username, password)){
        //Generate JWT access token
        let accessToken  = jwt.sign({
            data: password
        }, 'access',{ expiresIn: 60 * 60 });
        
        //Store acces token and username in session
        req.session.authorization = {
            accessToken,
            username
        };
        return res.status(200).send("User successfully logged in");
    }
    return res.status(208).json({ message: "Invalid login. Check username and password" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
