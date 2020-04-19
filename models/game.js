const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const SeatSchema = new Schema({ 
  seatNumber: Number,
  username: String,
  chipCount: Number, 
});

const ConfigSchema = new Schema({
  rollTimeout: {
    type: Number,
    required: [true, "config.rollTimeout field is required"]
  },
  minSeats: {
    type: Number,
    required: [true, "minSeats field is required"]  
  },
  maxSeats: {
    type: Number,
    required: [true, "maxSeats field is required"]
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

const RollSchema = new Schema({
  seatNumber: Number,
  outcome: [Number]
})

const GameSchema = new Schema({
  created: {
    type: Date,
    required: [true, "created field is required"]
  },
  centerChipCount: Number,
  config: ConfigSchema,
  seats: [SeatSchema],
  rolls: [RollSchema]
})

const Game = mongoose.model('game', GameSchema);

module.exports = Game;