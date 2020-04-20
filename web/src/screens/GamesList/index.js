import React, {useState} from 'react';
import './style.css';
import axios from 'axios'


const GamesList = (props) => {
  const {games} = props;
  console.log('props', props)
  return(
    <div>
      {games.map(g => {
        return(
        <div key={g._id}>{g._id}</div>
        )
      })
    }
    </div>
  )
  

}

export default GamesList;
