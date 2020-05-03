import React from 'react';
export default (props) => {
  const {index, char} = props;
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
        <text
          fill='black'
          x={textX}
          y={14}
          font-weight="bold"
          text-anchor="middle"
          alignment-baseline="middle"
        >{char}</text>    
    </g>
  )
}