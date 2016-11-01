var express = require('express');
var bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.load();
var db = require('./models');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var secret = "mysupersecretpassword";

app.set('view engine', 'ejs');

// tell our server where our static files live.
app.use(express.static("public"));
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(process.env.PORT || 3000);



// UNPROTECTED ROUTES
// home page
app.get('/', function(req, res) {
  res.render("home");
  console.log("home and login page rendered")
});


// signup
app.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      password: req.body.password,
      is_admin: false
    }
  }).spread(function(user,created) {
    if(created) {
      // generate token once user is successfully created
      var token = jwt.sign(user.toJSON(), secret);
      res.json({user: user, token: token, status: true});
    }
    else {
      console.log('user creation failed');
      // redirect to signup page with error message shown
      res.redirect('/')
      // res.send({message: 'error signing up. please try again'});
      // res.json({status: false});
    }
  });
});

// login
app.post('/login', function(req, res) {
  db.user.find({
    where: {email: req.body.email}
  }).then(function(user) {
    if (user.validPassword(req.body.password)) {
      var token = jwt.sign(user.toJSON(), secret);
      // var json = {user: user, token: token}
      console.log('should be working')
      // res.render('user', {token: token})
      res.json({user: user, token: token, status: true});
    } else {
      console.log('should redirect status false');
      // res.redirect('/')
      res.json({status: false});
    }
  });
});



// PROTECTED ROUTES
// any routes after this require a token to access
// app.use(expressJWT({secret: secret}));

app.use(expressJWT({
 secret: secret,
 credentialsRequired: true,
 getToken: function fromHeaderOrQuerystring (req) {
   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
       return req.headers.authorization.split(' ')[1];
   } else if (req.query && req.query.token) {
     return req.query.token;
   }
   return null;
 }
}));

// user page
app.get('/user', function (req, res) {
  // console.log('did user get redirected?', req.user);
  // query to db to show all drops once user has logged in
  res.render("user");
  // console.log('user.ejs should be rendered');
});

// get all polls
app.get('/polls', function (req, res) {
  db.poll.findAll().then(function(polls) {
    console.log(polls);
    res.json(polls);
    // users will be an array of all User instances
  });
});

// create new poll
app.post('/polls', function (req, res) {
  db.user.findOne({
    where:{email: req.user.email}
  }).then(function(user) {
    user.createPoll({
      poll_category: req.body.pollCategory
    }).then(function(data) {
      res.json({data: data});
    });
  });
});

// get all options
app.get('/options', function (req, res) {

});

// create new option
app.post('/options', function (req, res) {
  console.log('did you come in???????');
  console.log(req.body);
  db.poll.findOne({
    where:{id: req.body.pollId}
  }).then(function(poll) {
    console.log(poll);
    poll.createOption({
      image_url: req.body.imageUrl,
      product_description: req.body.pdtDescription,
      product_retail_price: req.body.pdtRetailPrice,
      product_code: req.body.pdtCode
    }).then(function(data) {
      res.json({data:data, status: true});
      console.log('create option success', data);
      // res.redirect('/polls');
    });
  });
});


app.use(function (err, req, res, next) {
  console.log(err);
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
  // create an unauthorised ejs file to display authorization message
});






module.exports = server;
