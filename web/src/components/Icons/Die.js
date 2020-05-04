import React from 'react';
export default (props) => {
  const {rollIndex, char, eventIndex} = props;
  const rectX = rollIndex * 25
  const textX = rectX + 10
  const rectY = eventIndex * 30;
  const textY = rectY + 12
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
        <text
          fill='black'
          x={textX}
          y={textY}
          font-weight="bold"
          text-anchor="middle"
          alignment-baseline="middle"
        >{char}</text>    
    </g>
  )
}