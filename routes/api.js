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
      "seatNumber": i,
      "userId": 'abcmer',
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
  try {    
    var game = await Game.findById(gameId).exec();
    const seatNumber = game.seats.find(s => s.userId == userId).seatNumber
      
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
          console.log(game.seats)
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
          // increase
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

module.exports = router;