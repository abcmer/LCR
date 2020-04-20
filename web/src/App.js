import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewGameForm from './screens/NewGameForm';
import GamesList from './screens/GamesList';
import axios from 'axios';
import './App.css';

function App() {
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
      <div className="App">
        <Switch>
          <Route exact path="/">
            <header className="App-header">
            <Link
              className="App-link"
              to="/new-game"
            >
              New Game
            </Link>
            <Link
              className="App-link"
              to="/games-list"
            >
              View Games
            </Link>            
            </header>
          </Route>
          <Route exact path="/new-game">
            <NewGameForm />
          </Route>  
          <Route exact path="/games-list">
            <GamesList games={games}/>
          </Route>                    
        </Switch>
      </div>
    </Router>
  );
}

export default App;
