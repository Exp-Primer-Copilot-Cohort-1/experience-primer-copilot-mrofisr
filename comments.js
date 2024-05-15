// Create web server

// Import Express.js
const express = require('express');
const app = express();

// Import path
const path = require('path');

// Import body-parser
const bodyParser = require('body-parser');

// Import mongoose
const mongoose = require('mongoose');

// Import Comment model
const Comment = require('./models/comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');

// Set view engine
app.set('view engine', 'pug');

// Set views path
app.set('views', path.join(__dirname, 'views'));

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        comments: comments
      });
    }
  });
});

// Add comment
app.post('/add', (req, res) => {
  let comment = new Comment();
  comment.name = req.body.name;
  comment.comment = req.body.comment;

  comment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});