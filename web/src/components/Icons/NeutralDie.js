import React from 'react';
export default (props) => {
  const {index} = props;
  const rectX = index * 25
  const textX = rectX + 10
  return(
    <g  
    >
      <rect
        fill='white'
        width='20'
        height='20'
        x={rectX}
        y={2}  
        rx="2"    
      />
      <circle
        fill='black'
        cx={textX}
        cy={13}
        r={4}      
      >
      </circle>
    </g>
  )
}