import React from 'react';
export default (props) => {
  const {rollIndex, eventIndex} = props;
  const rectX = rollIndex * 25
  const textX = rectX + 10
  const rectY = eventIndex * 30;
  const textY = rectY + 10
  return(
    <g  
    >
      <rect
        fill='white'
        width='20'
        height='20'
        x={rectX}
        y={rectY}  
        rx="2"    
      />
      <circle
        fill='black'
        cx={textX}
        cy={textY}
        r={4}      
      >
      </circle>
    </g>
  )
}