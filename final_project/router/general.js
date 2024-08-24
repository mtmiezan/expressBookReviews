const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Extract user credentials  from url body
    const { username, password } = req.body;
    //Check if both username and password are provided
    if(username && password){
        //Check if the user doesn't already exist
        if(!isValid(username)){
            //Add tne new user to the user array
            users.push({ username,password });
            return res.status(200).json({message: "User succesfully registered. Now you can login"});
        }
        else{
            return res.status(404).json({ message: "User already exists" });
        }
    }
    return res.status(404).json({ message: "Unable to register user" });
    
    
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null, 4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Extract isbn parameter from request url
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Extract author parameter from request url
    const author = req.params.author;
    //Return array ok key and value from books
    const booksdfromauthor = Object.fromEntries(Object.entries(books).filter( ([key,value]) => value.author == author));
    res.send(booksdfromauthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
     //Extract author parameter from request url
     const title = req.params.title;
     //Return array ok key and value from books
     const booksfromtitle = Object.fromEntries(Object.entries(books).filter( ([key,value]) => value.title == title));
     res.send(booksfromtitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Extract isbn paramter from url
    const isbn = req.params.isbn;

    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
