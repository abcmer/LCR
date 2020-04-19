import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewGameForm from './NewGameForm';
import './App.css';

function App() {
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
            </header>
          </Route>
          <Route exact path="/new-game">
            <NewGameForm />
          </Route>          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
