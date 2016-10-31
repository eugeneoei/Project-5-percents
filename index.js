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
      res.json({token: token, status: true});
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
      res.json({token: token, status: true});
    } else {
      console.log('should redirect status false');
      // res.redirect('/')
      res.json({status: false});
    }
  });
});



// PROTECTED ROUTES
// any routes after this will be protected?
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

app.get('/user', function (req, res) {
  console.log('did user get redirected?', req.user);
  res.render("user");
  console.log('user.ejs should be rendered');
});


app.use(function (err, req, res, next) {
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
  // create an unauthorised ejs file
});






module.exports = server;
