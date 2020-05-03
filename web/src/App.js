import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewGameForm from './screens/NewGameForm/NewGameForm';
import Game from './screens/Game/Game';
import axios from 'axios';
import {Container, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  app: {
    background: '#271331',
    border: 0,
    color: 'white',
    height: '1000px',
  },
  newGameButton: {
    color: 'white'
  }
}); 

function App() {
  const classes = useStyles();
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    const response = await axios.get('http://localhost:5000/api/games')
    setGames(response.data)  
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <div className={classes.app}>
      <Router>
        <Container className="App">
        <Switch>
            <Route exact path="/">
              <Button className={classes.newGameButton}>
              <Link
                to="/new-game"
              >
                New Game
              </Link>    
              </Button>      
            </Route>
            <Route exact path="/new-game">
              <NewGameForm />
            </Route>                  
            <Route exact path="/games/:gameId">
              <Game/>
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
