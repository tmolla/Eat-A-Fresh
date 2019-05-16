var db = require("../models");

module.exports = function(app) {
  // Get all harvest type
  app.get("/api/harvest", function(req, res) {
    db.Harvest.findAll().then(function(dbharvest) {
      res.json(dbharvest);
    });
  });

  // Create a new harvest Entry
  app.post("/api/harvest", function(req, res) {
    db.Harvest.create(req.body).then(function(dbharvest) {
      res.json(dbharvest);
    });
  });

  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({ include: [db.Log] }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  app.post("/api/users/login", function(req, res) {
    db.User.findOne({
      where: {
        Password: req.body.Password,
        EMail: req.body.EMail
      }
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Get all specific user
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Log]
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  //update user information
  app.put("/api/users/:id", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  //Find all share and take activities by all users
  app.get("/api/log", function(req, res) {
    db.Log.findAll({
      include: [db.Harvest]
    }).then(function(dblogs) {
      res.json(dblogs);
    });
  });

  //Find specific activity
  app.get("/api/log/:id", function(req, res) {
    db.Log.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Harvest]
    }).then(function(dblogs) {
      res.json(dblogs);
    });
  });

  //find all activities by a specific user
  app.get("/api/log/user/:uid", function(req, res) {
    db.Log.findAll({
      where: {
        userid: req.params.uid
      },
      include: [db.Harvest]
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Create a new log Entry
  app.post("/api/logs", function(req, res) {
    db.Log.create(req.body).then(function(dbLog) {
      res.json(dbLog);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
