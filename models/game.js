const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const SeatSchema = new Schema({ 
  seatNumber: Number,
  userId: String,
  chipCount: Number, 
});

const ConfigSchema = new Schema({
  rollTimeout: {
    type: Number,
    required: [true, "config.rollTimeout field is required"]
  },
  minPlayers: {
    type: Number,
    required: [true, "minPlayers field is required"]  
  },
  maxPlayers: {
    type: Number,
    required: [true, "maxPlayers field is required"]
  },
  startTime: {
    type: Date,
    required: [true, "startTime field is required"]
  },
  initialChipCount: {
    type: Number,
    required: [true, "initialChipCount field is required"]
  }   
})


//create schema for todo
const GameSchema = new Schema({
  created: {
    type: Date,
    required: [true, "created field is required"]
  },
  config: ConfigSchema,
  seats: [SeatSchema]
})

//create model for todo
const Game = mongoose.model('game', GameSchema);

module.exports = Game;