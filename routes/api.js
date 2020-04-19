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
  const maxSeats = req.body.config.maxSeats
  const initialChipCount = req.body.config.initialChipCount
  
  // Create empty seats
  let seats = []
  for (i=0; i < maxSeats; i++) {
    seats.push({
      "seatNumber": i,
      "username": null,
      "chipCount": 0,
    })
  }
  req.body.seats = seats

  // Set centerChipCount
  req.body.centerChipCount = 0

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
    game.set(req.body);
    var result = await game.save();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
})

router.put('/games/:gameId/rolls', async (req, res) => {
  // Parse auth token, gameId, user
  const {gameId} = req.params;
  const {username} = req.query;
  try {    
    var game = await Game.findById(gameId).exec();
    const seatNumber = game.seats.find(s => s.username == username).seatNumber
    const userChipCount = game.seats[seatNumber].chipCount;

    // Determine number of rolls
    const numberOfRolls = getNumberOfRolls(userChipCount)

    if (!numberOfRolls) {
      res.status(400).send({status: 'error', msg: 'User must have at least 1 chip to roll.'});
    }      
    // Simulate dice rolls
    let outcome = []
    for (i=0; i<numberOfRolls; i++) {
      outcome.push(Math.ceil(Math.random()*6))
    }

    game.rolls.push({
      seatNumber,
      outcome
    })
    
    outcome.forEach(roll => {
      switch (roll) {
        case 1:
          // LEFT
          console.log('user rolls LEFT')
          game.seats[getSeatToLeft(seatNumber, game.seats.length)].chipCount += 1
          game.seats[seatNumber].chipCount -= 1
          break;
        case 2:
          // RIGHT
          console.log('user rolls RIGHT')
          game.seats[(getSeatToRight(seatNumber, game.seats.length))].chipCount += 1
          game.seats[seatNumber].chipCount -= 1
          break;
        case 3:
          // CENTER
          console.log('user rolls CENTER')
          game.centerChipCount += 1
          game.seats[seatNumber].chipCount -= 1
          break;
        default:
          console.log("user rolls STAY")
      }
    })    
    var result = await game.save();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
})

router.put('/games/:gameId/seats/:seatIndex', async (req, res) => {
  const {gameId, seatIndex} = req.params
  const {username} = req.query;
  try {
    var game = await Game.findById(gameId).exec();
    game.seats[seatIndex].username = username
    game.seats[seatIndex].chipCount = game.config.initialChipCount
    var result = await game.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error)
  }
})

const getSeatToLeft = (seatNumber, numberOfSeats) => {
  // SeatNumber to the left is seatNumber + 1 because gameplay moves to the left  
  if (seatNumber == numberOfSeats -1) {
    return 0
  } else {
    return seatNumber + 1
  }
}

const getSeatToRight = (seatNumber, numberOfSeats) => {
  // seatNumber to the right is seatNumber -1 because gameplay moves to the left
  if (seatNumber == 0) {
    return numberOfSeats - 1
  } else {
    return seatNumber -1
  }
}

const getNumberOfRolls = (chipCount) => {
  if (chipCount >= 3) {
    return 3
  } else {
    return chipCount
  }
}

module.exports = router;