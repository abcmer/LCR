import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
  rollHistoryEvent: {
    display: 'flex'
  },
  username: {
    marginRight: '5px'
  }  
  
}

const getRecentRolls = rolls => {
  return rolls.slice(rolls.length - 7, rolls.length)
}

const renderRollHistoryEvent = (roll) => {
  return(
    <p style={styles.rollHistoryEvent}>
      <div style={styles.username}>{roll.seat.username} </div>
      <div>{getRollOutcome(roll)}</div> 
    </p>
  )
}

const getRollOutcome = (roll) => {
  return roll.outcome.map(r => {
    switch (r){
      case 1:
        console.log('LEFT')
        return <ArrowBackIcon/>
        break;
      case 2:
        console.log('RIGHT')
        return <ArrowForwardIcon/>
        break;
      case 3:
        console.log('CENTER')
        return <CenterFocusStrongIcon/>
        break;
      default:
        console.log('SAFE')
        return <CheckCircleIcon/>
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