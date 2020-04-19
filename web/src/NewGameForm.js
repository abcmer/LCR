import React, {useState} from 'react';
import './App.css';

const NewGameForm = () => {
  const [rollTimeout, setRollTimeout] = useState(10)
  const [minSeats, setMinSeats] = useState(2)
  const [maxSeats, setMaxSeats] = useState(10)

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
    }
  }

  const handleSubmit = (e) => {
    console.log(rollTimeout, minSeats, maxSeats)
    e.preventDefault();
  }
  

  return(
    <div>
      <h1>New Game Form</h1>    
      <form onSubmit={handleSubmit}>
        <label>
          Roll Timeout:
          <input type="text" defaultValue={rollTimeout} name="rollTimeout" onChange={handleChange} />
        </label>
        <label>
          Min Seats:
          <input type="text" defaultValue={minSeats} name="minSeats" onChange={handleChange} />
        </label>
        <label>
          Max Seats:
          <input type="text" defaultValue={maxSeats} name="maxSeats" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}

export default NewGameForm;
