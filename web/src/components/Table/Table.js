import React, {useState, useEffect} from 'react'

const Table = (props) => {
  const {activeSeatNumber, seats, centerChipCount} = props.gameData;
  
  const [svgHeight, setSvgHeight] = useState(window.innerHeight);
  const [svgWidth, setSvgWidth] = useState(window.innerWidth);
  const radius = svgWidth * .17

  const updateDimensions = () => {
    setSvgHeight(window.innerHeight);
    setSvgWidth(window.innerWidth)
  }

  useEffect(() => {
    console.log('useEffect')
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  }, [])

  const renderActiveSeatDot = () => {
    const ang = (360/seats.length) * activeSeatNumber
    return(
      <circle 
        r="8"
        stroke="black"
        stroke-width="3"
        transform={`
        translate(${svgWidth * .2}, ${svgWidth * .2})
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
        translate(${svgWidth * .2}, ${svgWidth * .2})
        `}
        >
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
          translate(${svgWidth * .2}, ${svgWidth * .2})
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
    <svg style={{'height': svgHeight, width: svgWidth / 2}}>
      <g>
        <circle
          cx={svgWidth * .2}
          cy={svgWidth * .2}
          r={radius}
          fill="#35654d"
          stroke="black"
          stroke-width="8"        
        />
        {renderActiveSeatDot()}
        {renderPlayerChipCounts()}
        {renderCenterChipCount()}
      </g>
    </svg>
  )
}

export default Table