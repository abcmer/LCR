const express = require ('express');
const router = express.Router();
const Game = require('../models/game');
const User = require('../models/user')

router.get('/users', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  User.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/users/:id', (req, res, next) => {
  User.findOne({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/users', (req, res, next) => {
  if(req.body.username){
    User.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/users/:id', (req, res, next) => {
  User.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.get('/games', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Game.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/games/:id', (req, res, next) => {
  Game.findOne({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/games', (req, res, next) => {
  Game.create(req.body)
  .then(data => res.json(data))
  .catch(next)
});

router.delete('/games/:id', (req, res, next) => {
  Game.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.put('/games/:id', async (req, res, next) => {
  try {
    var game = await Game.findById(req.params.id).exec();
    console.log('game', game)
    game.set(req.body);
    var result = await game.save();
    res.send(result);
} catch (error) {
    res.status(500).send(error);
}
})

module.exports = router;