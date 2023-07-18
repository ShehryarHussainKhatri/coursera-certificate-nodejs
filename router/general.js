const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  
  return res.status(200).json({books:books});
});

function searchByKeyValue(jsonData, key,value) {
  for (let objKey in jsonData) {
    if (jsonData[objKey][key] === value) {
      return jsonData[objKey];
    }
  }
  return null; // Author not found
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  const filteredResult = searchByKeyValue(books,'ISBN', isbn)
  if(filteredResult !== null){
    return res.status(200).json({'message': filteredResult})
  
  }
  return res.status(404).json({'message': `Book with ISBN ${isbn} does not exist`})
  
 });
  
// Get book details based on author


public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = req.params.author
  const filteredResult = searchByKeyValue(books,'author', authorName)
  if(filteredResult !== null){
    return res.status(200).json({'message': filteredResult})
  
  }
  return res.status(404).json({'message': `Book with author ${authorName} does not exist`})
  

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const filteredResult = searchByKeyValue(books,'title', title)
  if(filteredResult !== null){
    return res.status(200).json({'message': filteredResult})
  
  }
  return res.status(404).json({'message': `Book with title ${title} does not exist`})
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  const filteredResult = searchByKeyValue(books,'ISBN', isbn)
  if(filteredResult !== null){
    return res.status(200).json({'message': filteredResult.reviews})
  
  }
  return res.status(404).json({'message': `Book with isbn ${isbn} does not exist`})
  
  //Write your code here
});

module.exports.general = public_users;