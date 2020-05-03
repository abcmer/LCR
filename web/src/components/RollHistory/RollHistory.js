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
  console.log('roll', roll)
  const displayName = roll.seat.username.slice(0,10)
  return(
    <svg height='30'>
      <g>
        <text
          fill='white'
          font-size='20'
          // text-anchor="middle"
          alignment-baseline="hanging"
          // font-weight="bold"
          font-size="20"   
          // y='10'     
        >
          2s ago: {displayName}
        </text>
        <g
          transform={`
            translate(140,0)
          `}      
        >{getRollOutcome(roll)}</g> 
      </g>
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
  const recentRolls = getRecentRolls(rolls);
  const style = {
    marginTop: '30px'
  }
  return(
    <div style={style}>
      {renderRollHistory(recentRolls)}
    </div>
  )
}

export default RollHistory