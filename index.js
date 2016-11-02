var express = require('express');
var bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.load();
var morgan = require('morgan')
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

app.use(morgan('dev'))

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
   console.log('expressJWT called')
   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
       return req.headers.authorization.split(' ')[1];
   } else if (req.query && req.query.token) {
     return req.query.token;
   }
   return null;
 }
}));



app.use(function (err, req, res, next) {
  console.log(err);
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
  // create an unauthorised ejs file to display authorization message
});


// get all drops and polls when user looged in
app.get('/home', function (req, res) {
  var result = [];
  db.drop.findAll().then(function(drops) {
    result.push(drops);
    // console.log('check drops first', drops);
    db.poll.findAll({
      include: [db.option],
      order: [ [db.option, 'votes', 'DESC'] ]
    }).then(function(polls) {
      // console.log('did you survive?');
      result.push(polls)
      // console.log('check result array again', result);
      db.user.find({
        where: {id: req.user.id}
      }).then(function(user) {
        // console.log(user);
        res.render('user', {result:result, user:user})
      })
    })
  });
  // console.log('see hereeeeeee', req.user);
  // console.log('this is result', result);
});

app.post('/home', function (req, res) {
  console.log('ajax post to /home');
  var result = [];
  db.drop.findAll().then(function(drops) {
    result.push(drops);
    // console.log('check drops first', drops);
    db.poll.findAll({
      include: [db.option],
      order: [ [db.option, 'votes', 'DESC'] ]
    }).then(function(polls) {
      // console.log('did you survive?');
      result.push(polls)
      // console.log('check result array again', result);
      db.user.find({
        where: {id: req.user.id}
      }).then(function(user) {
        // console.log(user);
        res.render('user', {result:result, user:user})
      })
    })
  });
  // console.log('see hereeeeeee', req.user);
  // console.log('this is result', result);
});


// get all drops
// this is working
// app.get('/drops', function(req,res) {
//   db.drop.findAll().then(function(drops) {
//     res.json(drops);
//   });
// });

// get one drop
app.get('/drops/:id', function (req, res) {
  db.drop.find({
    where: {id: req.params.id}
  }).then(function(drop) {
    res.json({drop: drop})
  })
});

// user joins drop
// should populate dropsUsers table
app.post('/joinDrop/:id', function (req, res) {
  console.log('joinDrop route');
  db.drop.find({
    where: {id: req.params.id}
  }).then(function(drop){
    console.log('dropsusers populated?');
    drop.addUser(req.user.id)
    res.json({drop:drop})
  })
});

//////////// POLLS CRUD ////////////

// get all polls
// to send req.user.id in res.json to allow users to edit the options they created
app.get('/polls', function (req, res) {
  db.poll.findAll({
    include: [db.option]
  }).then(function(polls) {
    res.json(polls);
  });
});

// get one poll
// this returns all options of a particular poll where users can cast their votes
app.get('/polls/:id', function (req, res) {
  db.poll.findOne({
    where: {id: req.params.id}
  }).then(function(poll) {
    poll.getOptions().then(function(options){
      res.json(options);
    });
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

//////////// OPTIONS CRUD ////////////

// get all options
app.get('/options', function (req, res) {

});

// create new option
app.post('/options', function (req, res) {
  // console.log('did you come in???????');
  // console.log(req.body);
  db.poll.findOne({
    where:{id: req.body.pollId}
  }).then(function(poll) {
    // console.log(poll);
    poll.createOption({
      userId: req.user.id,
      image_url: req.body.imageUrl,
      title: req.body.pdtTitle,
      product_description: req.body.pdtDescription,
      product_retail_price: req.body.pdtRetailPrice,
      product_code: req.body.pdtCode,
      votes: 0
    }).then(function(data) {
      res.json({data:data, status: true});
      // console.log('create option success', data);
      // res.redirect('/polls');
    });
  });
});

// get option created by user
app.get('/options/:id/edit', function (req,res) {
  db.option.find({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  }).then(function(data) {
    res.json(data)
  })
});

// update option
app.put('/options/:id', function (req, res) {
  var oldVotes = parseInt(req.body.votes)
  db.option.update({
    votes: oldVotes + 1
  }, {
    where: {
      id: req.params.id,
    }
  }).then(function(data) {
    console.log(data);
    console.log('see here for the updated votes', data.votes);
    res.json(data)
  })
});



module.exports = server;
