import React from 'react';
import Die from '../Icons/Die'


const styles = {
  rollHistoryEvent: {
    display: 'flex'
  },
  username: {
    marginRight: '5px'
  }  
  
}

const getRecentRolls = rolls => {
  if (rolls.length <= 8) return rolls;
  else return rolls.slice(rolls.length - 8, rolls.length)
}

const renderRollHistoryEvent = (roll) => {
  return(
    <svg height='30'>
      <g>{getRollOutcome(roll)}</g> 
    </svg>
  )
}

const getRollOutcome = (roll) => {
  return roll.outcome.map((r, i) => {
    switch (r){
      case 1:
        return <Die index={i} char='L'/>
        break;
      case 2:
        return <Die index={i} char='R'/>
        break;
      case 3:
        return <Die index={i} char='C'/>
        break;
      default:
        return <Die index={i} char='S'/>
    }
  })
}

const renderRollHistory = (rolls) => {
  return <div>
    {rolls.map(roll => renderRollHistoryEvent(roll))}
  </div>
}

const RollHistory = (props) => {
  const {rolls} = props;
  return(
    <div>
      {renderRollHistory(getRecentRolls(rolls))}
    </div>
  )
}

export default RollHistory