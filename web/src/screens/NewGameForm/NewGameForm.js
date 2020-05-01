import React, {useState} from 'react';
import './style.css';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const NewGameForm = () => {
  const [rollTimeout, setRollTimeout] = useState(10)
  const [minSeats, setMinSeats] = useState(2)
  const [maxSeats, setMaxSeats] = useState(10)
  const [gameId, setGameId] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    switch (e.target.name) {
      case "rollTimeout":
        setRollTimeout(value)
        break;
      case "minSeats":
        setMinSeats(value)
        break;
      case "maxSeats":
        setMaxSeats(value)
        break;
      default:
        console.log('unkown case')
    }
  }

  const handleSubmit = (e) => {
    console.log(rollTimeout, minSeats, maxSeats)
    e.preventDefault();
    axios.post('http://localhost:5000/api/games', {
      "created": "2020-04-18 12:00:00",
      "config": {
        rollTimeout: 10,
        minSeats: 2,
        maxSeats,
        "startTime": "2020-04-18 13:00:00",
        "initialChipCount": 3
      }
    })
    .then(function (response) {
      console.log(response)
      setGameId(response.data._id)
      console.log(response.data._id)
    })
  }
  

  return(
    <div>
      {gameId
        ? <Link key={gameId} to={`/games/${gameId}`}>{`${window.location.origin}/games/${gameId}`}</Link>
        : <div>     
            <h1>New Game Form</h1>    
            <form onSubmit={handleSubmit}>
              <label>
                Table Size:
                <input type="text" defaultValue={maxSeats} name="maxSeats" onChange={handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>}
    </div>
  )
}

export default NewGameForm;
