

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const encrypt= require('mongoose-encryption');
const Post = require("./models/postModel");
const User = require("./models/userModel");

const app = express();

app.set('view engine', 'ejs');

// middleware body-parser used

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongodb connected,created users db

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});


//home page route

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      
      posts: posts
      });
  });
});
//// Routes for creating a new post/submission

app.get("/compose", function(req, res){
  res.render("register");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});
//open post with that postId

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.post("/posts/:postId"), function(req, res){
  const comment= new Comment({
    ccontent: req.body.commentText
  });
  post.save(function(err){
    if (!err){
        res.render("/posts/:postId");
    }
  });
}


//// Routes for creating a new user

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const newUser=new User({
    email:req.body.username,
    password:req.body.password,
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("compose");
    }
  
});
});

//routes for extra options

app.get("/corona", function(req, res){
  res.redirect("https://www.indiatoday.in/coronavirus");
});
app.get("/Livetv", function(req, res){
  res.redirect("https://www.indiatoday.in/livetv");
});


app.get("/login", function(req, res){
  res.render("login");
});

//check user and password(validation)
app.post("/login", function(req, res){

 
    username= req.body.username;
    password= req.body.password;
  
User.findOne({email:username},function(err,foundUser){

  if (err) {
    console.log("please enter all fields");
  } else {
    if(foundUser){
      if(foundUser.password===password){
        res.redirect('/');
      }
    }
  }

});
});

//update

app.get("/edit/:id", (req, res) => {
  const requestedId = req.params.id;
  console.log(req.body);
  Post.findOne({
    _id: requestedId
  }, (err, post) => {
    if (!err) {
      res.render("edit", {
        title: post.title,
        content: post.content
      });
    }
  });
});



//delete

app.post("/delete", (req, res) => {
  const deletePost = req.body.delete;

  Post.findByIdAndDelete(deletePost, (err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
