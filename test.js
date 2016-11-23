app.get('/home', function (req, res) {
  var result = [];
  db.drop.findAll({
    order: [['id', 'ASC']]
  }).then(function(drops) {
    result.push(drops);
    db.poll.findAll({
      include: [db.option],
      order: [ [db.option, 'votes', 'DESC'] ]
    }).then(function(polls) {
      result.push(polls)
      db.user.find({
        where: {id: req.user.id}
      }).then(function(user) {
        res.render('user', {result:result, user:user})
      })
    })
  });
});

app.get('/home', function (req, res) {
  var result = [];
  db.drop.findAll({
    order: [['id', 'ASC']]
  }, function(drops) {
    results.push(drops);
    db.poll.findAll({
      include: [db.option],
      order: [ [db.option, 'votes', 'DESC'] ]
    }, function(polls) {
      result.push(polls);
      db.user.find({
        where: {id: req.user.id}
      }).then(function(user) {
        res.render('user', {result:result, user:user})
      })
    })
  })
});
