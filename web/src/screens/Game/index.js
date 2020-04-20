import React from 'react';
import {
  useParams
} from 'react-router-dom';

const Game = () => {
  const {gameId} = useParams();
  return(
    <div>
      <h1>{gameId}</h1>      
    </div>
  )
}

export default Game