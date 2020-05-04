import React, {useState, useEffect} from 'react';
import Die from '../Icons/Die'
import NeutralDie from '../Icons/NeutralDie'
import {timeDifference} from '../../utils'


const styles = {
  rollHistoryEvent: {
    display: 'flex'
  },
  username: {
    marginRight: '5px'
  }  
}

const RollHistory = (props) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const svgWidth = windowWidth / 2 
  const svgHeight = windowWidth / 2;
  const {rolls} = props;
  const style = {
    marginTop: '30px'
  }

  const updateDimensions = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth)
    console.log(windowHeight)
    console.log(windowWidth)
  }

  useEffect(() => {
    console.log('useEffect')
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  }, [])  


  const getRecentRolls = rolls => {
    const numberToShow = Math.floor(svgHeight * .8 / 30)
    if (rolls.length <= numberToShow) return rolls;
    else return rolls.slice(rolls.length - numberToShow, rolls.length)
  }
  
  const renderRollHistoryEvent = (roll, eventIndex) => {
    const displayName = roll.seat.username.slice(0,10)
    const timediff = timeDifference(new Date, new Date(roll.date))
    return(      
      <g>
        <text
          fill='white'
          font-size='20'
          alignment-baseline="hanging"
          font-size="20"
          y={eventIndex * 30}   
        >
          {timediff}: {displayName}
        </text>
        <g
          transform={`
            translate(140,0)
          `}      
        >{getRollOutcome(roll, eventIndex)}</g> 
      </g>
    )
  }
  
  const getRollOutcome = (roll, eventIndex) => {
    return roll.outcome.map((r, i) => {
      switch (r){
        case 1:
          return <Die rollIndex={i} eventIndex={eventIndex} eventIndex={eventIndex} char='L'/>
          break;
        case 2:
          return <Die rollIndex={i} eventIndex={eventIndex} char='R'/>
          break;
        case 3:
          return <Die rollIndex={i} eventIndex={eventIndex} char='C'/>
          break;
        default:
          return <NeutralDie rollIndex={i} eventIndex={eventIndex} />
      }
    })
  }
  
  const renderRollHistory = (rolls) => {
    return <g>
      {rolls.map((roll, index) => renderRollHistoryEvent(roll, index))}
    </g>
  }  

  const recentRolls = getRecentRolls(rolls);
  return(
    <div style={style}>
      <svg style={{height: svgHeight, width: svgWidth}}>
        {renderRollHistory(recentRolls)}
      </svg>
    </div>
  )
}

export default RollHistory