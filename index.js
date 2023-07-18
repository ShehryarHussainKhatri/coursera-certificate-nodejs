const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse request body
app.use(bodyParser.json());

// Sample book data
const books = [
  {
    id: 1,
    isbn: '9780123456789',
    author: 'John Doe',
    title: 'Book 1',
    reviews: {}
  },
  {
    id: 2,
    isbn: '9789876543210',
    author: 'Jane Smith',
    title: 'Book 2',
    reviews: {}
  },
  // Add more books as needed
];

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((book) => book.isbn === isbn);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author;
  const filteredBooks = books.filter((book) => book.author === author);

  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ message: 'No books found by the author' });
  }
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title;
  const filteredBooks = books.filter((book) => book.title === title);

  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ message: 'No books found with the title' });
  }
});

// Task 5: Get book Review
app.get('/books/:id/reviews', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Task 6: Register New user
app.post('/users', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create a new user with provided details
  const newUser = {
    username,
    password
  };

  // Store the new user
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Task 7: Login as a Registered user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the list of registered users
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the password matches
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Successful login, generate a token or session

  // For simplicity, let's assume a simple authentication token is generated here
  const authToken = generateAuthToken();

  res.json({ message: 'Login successful', token: authToken });
});

// Generate a simple authentication token
function generateAuthToken() {
  // Generate a random string or use a library like jsonwebtoken to generate a token
  return 'your-auth-token';
}


// Task 8: Add/Modify a book review
app.put('/books/:id/reviews', (req, res) => {
  const bookId = parseInt(req.params.id);
  const review = req.body.review;

  const book = books.find((book) => book.id === bookId);

  if (book) {
    book.reviews = review;
    res.json({ message: 'Review added/modified successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Task 9: Delete book review added by that particular user
app.delete('/books/:id/reviews', (req, res) => {
  const bookId = parseInt(req.params.id);

  const book = books.find((book) => book.id === bookId);

  if (book) {
    book.reviews = {};
    res.json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Start the server
const port = 3000; // Choose an appropriate port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});