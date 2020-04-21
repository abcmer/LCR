import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  useParams
} from 'react-router-dom';
import axios from 'axios';
import {Container, Grid, Paper, Button } from '@material-ui/core/';
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
  const [gameData, setGameData] = useState([])
  const [seats, setSeats] = useState([])
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const fetchGameData = async () => {
    const response = await axios.get(`http://localhost:5000/api/games/${gameId}`)
    setGameData(response.data)
    setSeats(response.data.seats) 
  }

  const handleRoll = async (username) => {
    console.log('roll', username)
    const response = await axios.put(`http://localhost:5000/api/games/${gameId}/rolls?username=${username}`)
    const gameData = response.data
    const roll = gameData.rolls[gameData.rolls.length -1]
    console.log(roll)
    setGameData(response.data)
    setSeats(response.data.seats) 
  }

  const getRollOutcome = () => {
    const lastRoll = gameData.rolls[gameData.rolls.length -1]
    return lastRoll.outcome.map(r => {
      switch (r){
        case 1:
          console.log('LEFT')
          return <div>LEFT</div>
          break;
        case 2:
          console.log('RIGHT')
          return <div>RIGHT</div>
          break;
        case 3:
          console.log('CENTER')
          return <div>CENTER</div>
          break;
        default:
          console.log('SAFE')
          return <div>SAFE</div>
      }
    })
  }  

  useEffect(() => {
    fetchGameData()
  }, [])

  const {_id} = gameData;
  
  return(
    <Container>
      <h2>Center Chip Count: {gameData.centerChipCount}</h2>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
          {seats.map(s => {
            console.log(s.seatNumber)
            return (
              <Paper className={classes.paper} key={s._id}>
                <h4>{`${s.username}` || s.seatNumber}</h4>
                <div>{s.chipCount}</div>  
                <Button onClick={() => handleRoll(s.username)} variant="contained" color="primary">
                  Roll
                </Button>                              
              </Paper>
            )
          })}
          </Grid>
        </Grid>
      </Grid>
      {/* {gameData.rolls.length > 0 && getRollOutcome()} */}
    </Container>
  )
}

export default Game