import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  useParams
} from 'react-router-dom';
import axios from 'axios';
import {Grid, Button } from '@material-ui/core/';
import Table from '../../components/Table/Table'
import RollHistory from '../../components/RollHistory/RollHistory'
import './style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Game = () => {
  const {gameId} = useParams();
  const [seats, setSeats] = useState([])
  const [activeSeatNumber, setActiveSeatNumber] = useState(0)
  const [rolls, setRolls] = useState([])
  const [centerChipCount, setCenterChipCount] = useState([])
  const fetchGameData = async () => {
    const response = await axios.get(`http://localhost:5000/api/games/${gameId}`)
    // setGameData(response.data)  
    setSeats(response.data.seats)   
    setActiveSeatNumber(response.data.activeSeatNumber)
    setRolls(response.data.rolls)
    setCenterChipCount(response.data.centerChipCount)
  }

  const handleRoll = async (activeSeatNumber) => {
    const activeSeat = seats.find(s => s.seatNumber == activeSeatNumber)
    const seatId = activeSeat._id;
    // const username = activeSeat.username

    const response = await axios.put(`http://localhost:5000/api/games/${gameId}/rolls?seatId=${seatId}`)
    const gameData = response.data
    const roll = rolls[rolls.length -1]
    setRolls(response.data.rolls)
    setSeats(response.data.seats) 
    setActiveSeatNumber(response.data.activeSeatNumber)      
    setCenterChipCount(response.data.centerChipCount)
  }

  const getRollOutcome = () => {
    const lastRoll = rolls[rolls.length -1]
    return lastRoll.outcome.map(r => {
      switch (r){
        case 1:
          return <div>LEFT</div>
          break;
        case 2:
          return <div>RIGHT</div>
          break;
        case 3:
          return <div>CENTER</div>
          break;
        default:
          return <div>SAFE</div>
      }
    })
  }  

  useEffect(() => {
    fetchGameData()
  }, [])

  const gameData = {
    activeSeatNumber,
    seats,
    centerChipCount
  }
  return(
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {seats != [] ? <Table gameData={gameData}/>  : null}
      </Grid>
      <Grid item xs={6}>
        <RollHistory rolls={rolls}/>
        <Button onClick={() => handleRoll(activeSeatNumber)} variant="contained">
          Roll
        </Button>  
        <Button
          component={Link} to="/new-game"
          variant="contained"        
        >
          New Game
        </Button>
      </Grid>                    
    </Grid>
    
  )
}

export default Game