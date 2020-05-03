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
  return rolls.slice(rolls.length - 8, rolls.length)
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
        console.log('LEFT')
        return <Die index={i} char='L'/>
        break;
      case 2:
        console.log('RIGHT')
        return <Die index={i} char='R'/>
        break;
      case 3:
        console.log('CENTER')
        return <Die index={i} char='C'/>
        break;
      default:
        console.log('SAFE')
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
  console.log('rolls', props.rolls)
  return(
    <div>
      {renderRollHistory(getRecentRolls(rolls))}
    </div>
  )
}

export default RollHistory