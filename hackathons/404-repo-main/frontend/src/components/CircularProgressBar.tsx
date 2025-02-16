import React from 'react';

function CircularProgressBar({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  color = "#3e98c7",
  textColor = "#000",
  textSize = 20,
  backgroundColor = "#e6e6e6",
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  textColor?: string;
  textSize?: number;
  backgroundColor?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={textSize}
        fill={textColor}
      >
        {Math.round((value / max) * 100)}%
      </text>
    </svg>
  );
}

export default CircularProgressBar;
