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



function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const [games, setGames] = useState([])

  const updateDimensions = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    console.log('useEffect')
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  }, [])    

  const fetchGames = async () => {
    const response = await axios.get('http://localhost:5000/api/games')
    setGames(response.data)  
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const useStyles = makeStyles({
    app: {
      background: 'radial-gradient(circle, rgba(85,49,103,1) 26%, rgba(65,36,80,1) 45%, rgba(38,19,48,1) 88%);',
      border: 0,
      color: 'white',
      height: windowHeight,
      width: windowWidth
    },
    newGameButton: {
      color: 'white'
    }
  }); 

  const classes = useStyles();

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
