// Create web server
const express = require('express');
const app = express();
// Add body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// Add mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
// Create a schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});
// Create a model
const Comment = mongoose.model('Comment', commentSchema);
// Set engine for ejs
app.set('view engine', 'ejs');
// Set static folder
app.use(express.static('public'));
// Listen to port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// Get requests
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) console.log(err);
    res.render('index', { comments: comments });
  });
});
// Post requests
app.post('/comment', (req, res) => {
  let newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  newComment.save(err => {
    if (err) console.log(err);
    res.redirect('/');
  });
});
// Delete requests
app.delete('/comment/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, err => {
    if (err) console.log(err);
    res.send('Success');
  });
});
// Update requests
app.put('/comment/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, { comment: req.body.comment }, err => {
    if (err) console.log(err);
    res.send('Success');
  });
});