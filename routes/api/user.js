const User = require("../../db").User;
const route = require("express").Router();

route.get("/", (req, res) => {
  // We want to send an array of all users
  // From our database here
  User.findOne({
    where: {
      Email: req.query.email
    }
  })
    .then(users => {
      res.status(201).send(users);
    })
    .catch(err => {
      res.status(501).send({
        error: "Could not retrive users"
      });
    });
});
route.post("/", (req, res) => {
  // We expect the req to have name in it
  // We will create a new user
  User.findAll({
    where: {Email: req.body.email}
  }).then(user=>{
    if(user.length == 0){
      User.create({
        Email: req.body.email
      })
        .then(user => {
          res.status(201).send({message: "User Added"});
        })
        .catch(err => {
          res.status(501).send({
            error: "Could not add new user"
          });
        });
    }
    else{
      res.status(201).send({message: "User already exist"});
    }
  }).catch(err => {
    res.status(501).send({
      error: "Could not add new user"
    });
  });
  
});

exports = module.exports = route;
