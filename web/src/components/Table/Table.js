import React from 'react'

const Table = (props) => {
  console.log(props.gameData)
  const {activeSeatNumber, seats, centerChipCount} = props.gameData;
  const radius = 150
  const numOfSeats = seats.length || 12;

  const renderActiveSeatDot = () => {
    const ang = (360/seats.length) * activeSeatNumber
    return(
      <circle 
        r="8"
        stroke="black"
        stroke-width="3"
        transform={`
        translate(180,180)
        rotate(${ang})
        translate(0, ${1 * radius * 1.1})
        `}
        fill="white"
      />
    )
  }

  const renderCenterChipCount = () => {
    return(        
      <text
        fill='white'
        text-anchor="middle"
        alignment-baseline="middle"
        font-weight="bold"
        font-size="20"
        transform={`
        translate(180,180)
        `}>
        {centerChipCount}
      </text>
    )
  }

  const renderPlayerChipCounts = () => {
    return seats.map((s, i) => {
      const ang = (360/seats.length) * i
      return(        
        <text 
          fill='white' 
          width={20}
          text-anchor="middle"
          alignment-baseline="middle"
          transform={`
          translate(180,180)
          rotate(${ang})
          translate(0, ${1 * radius * .88})
          rotate(${-ang})
          `}>
          {s.chipCount}
        </text>
      )
    })
  }
  return (
    <svg style={{'height': '360', width: '360'}}>
      <circle
        cx="180"
        cy="180"
        r="150"
        fill="#35654d"
        stroke="black"
        stroke-width="8"        
      />
      {renderActiveSeatDot()}
      {renderPlayerChipCounts()}
      {renderCenterChipCount()}
    </svg>
  )
}

export default Table