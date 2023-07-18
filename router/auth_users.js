const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

function searchByKeyValue(jsonData, key,value) {
  for (let objKey in jsonData) {
    if (jsonData[objKey][key] === value) {
      return jsonData[objKey];
    }
  }
  return null; // Author not found
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("Customer successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn
  const review = req.body.review;
  const filteredResult = searchByKeyValue(books,'ISBN', isbn)
  
  if(filteredResult == null){
    return res.status(404).json({'message': `Book with ISBN ${isbn} does not exist`}) 
  }

  if (!Array.isArray(filteredResult.reviews)) {
    filteredResult.reviews = []; // Convert reviews to an array if it's not already
  } 
  filteredResult.reviews.push(review)
  return res.status(200).json({review: filteredResult,"message": `The review for ID ${isbn} has been updated`});
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const filteredResult = searchByKeyValue(books, 'ISBN', isbn);
  if (filteredResult == null) {
    return res.status(404).json({ 'message': `Book with ISBN ${isbn} does not exist` });
  }

  if (!Array.isArray(filteredResult.reviews)) {
    return res.status(404).json({ 'message': 'No reviews found for the book' });
  }

  const reviewIndex = filteredResult.reviews.findIndex(review => review === req.body.review);
  
  if (reviewIndex === -1) {
    return res.status(404).json({ 'message': 'Review not found' });
  }

  filteredResult.reviews.splice(reviewIndex, 1);

  return res.status(200).json({ 'message': `The review for ID ${isbn} has been deleted successfully` });
  
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;