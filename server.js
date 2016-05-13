// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dog_db');
var DogSchema = new mongoose.Schema({
 name: String,
 color: String
}, {
  versionKey: false
})
mongoose.model('Dog', DogSchema); // We are setting this Schema in our Models as 'User'
var Dog = mongoose.model('Dog') // We are retrieving this Schema from our Models, named 'User'

// Routes
// Root Request
app.get('/', function(req, res) {
    console.log("hello");
    Dog.find({}, function(err, dogs) {
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log(dogs);
        res.render('index', {dogs: dogs});
      }
      // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    
    })
});
// Add User Request 

app.post('/dogs', function(req, res) {
    console.log("POST DATA", req.body);
    var dog = new Dog({name: req.body.name, color: req.body.color});
    dog.save(function(err) {
     //if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a dog!');
       res.redirect('/');
      }
    })
});
app.get('/dogs/new', function(req, res) {
    console.log("let's add new dog");// This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    
    res.render('new');
    
})
app.get('/dogs/:id', function(req, res) {
    console.log("displaying info about dog");// This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Dog.findOne({_id: req.params.id}, function (err, dog){
        // loads a view called 'user.ejs' and passes the user object to the view!
        res.render('show', {dog: dog});
    })
    
})
app.get('/dogs/:id/edit', function(req, res) {
    console.log("let's update dog");// This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Dog.findOne({_id: req.params.id}, function (err, dog){
        // loads a view called 'user.ejs' and passes the user object to the view!
        res.render('edit', {dog: dog});
    })
})
app.post('/dogs/:id', function(req, res) {
    console.log("updated dog");// This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    
    Dog.update({_id: req.params.id}, {$set: {name: req.body.name, color: req.body.color}}, function (err, dog){

      if(err) {
        console.log('something went wrong on update');
      } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully updated dog!');
      res.redirect('/');
      }
    })
    
})
app.post('/dogs/:id/destroy', function(req, res) {
    console.log("deleting dog");// This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Dog.remove({_id: req.params.id}, function (err, dog){
    if(err) {
        console.log('something went wrong on delete');
      } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully deleted dog!');
      res.redirect('/');
      }
    })
    
})
// Setting our Server to Listen on Port: 8000
var server = app.listen(8000, function() {
  console.log('listening on port 8000, project name: Dogs');
});


