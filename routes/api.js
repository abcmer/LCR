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
  Game.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/games/:id', (req, res, next) => {
  Game.findOne({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/games', async (req, res, next) => {
  const maxPlayers = req.body.config.maxPlayers
  const initialChipCount = req.body.config.initialChipCount
  let seats = []
  for (i=0; i < maxPlayers; i++) {
    seats.push({
      "seat": i,
      "userId": null,
      "chipCount": initialChipCount,
    })
  }
  req.body.seats = seats
  Game.create(req.body)
  .then(data => res.json(data))
  .catch(next)
});

router.delete('/games/:id', (req, res, next) => {
  Game.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.delete('/games', (req, res, next) => {
  Game.deleteMany({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
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

router.post('/rolls', async (req, res) => {
  // Parse auth token, gameId, user
  const {gameId, userId, numberOfRolls} = req.body;
  // console.log('req.body', req.body)  

  try {    
    var game = await Game.findById(gameId).exec();
    // console.log('game', game)

    const seat = game.seats.find(s => s.userId == userId).seat
    console.log('seat', seat)
      
    // Simulate dice rolls
    let outcome = []
    for (i=0; i<numberOfRolls; i++) {
      outcome.push(Math.ceil(Math.random()*6))
    }

    console.log('outcome', outcome)
    game.rolls.push({
      seat,
      outcome
    })   
    
    console.log('game', game)
    var result = await game.save();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }




  // Game.findOne({"_id": gameId})
  //   .then(data => {
  //     const seat = data.seats.find(s => s.userId == userId)
      
  //     // Simulate dice rolls
  //     let outcome = []
  //     for (i=0; i<numberOfRolls; i++) {
  //       outcome.push(Math.ceil(Math.random()*6))
  //     }

  //     data.rolls.push({
  //       seat,
  //       outcome
  //     })
  //   })


  // Generate 3 random numbers async
})

module.exports = router;