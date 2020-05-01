import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewGameForm from './screens/NewGameForm';
import Game from './screens/Game';
import axios from 'axios';
import {Container} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

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
    <Router>
      <Container className="App">
      <Switch>
          <Route exact path="/">
            <header className="App-header">
            <Link
              className="App-link"
              to="/new-game"
            >
              New Game
            </Link>          
            </header>
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
  );
}

export default App;
