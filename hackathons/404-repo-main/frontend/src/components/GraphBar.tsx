import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphBar = () => {
  const values = [5, 15, 8, 3, 12, 7]; 

  const backgroundColors = values.map(value => {
    if (value > 10) {
      return 'rgba(75, 192, 75, 0.8)'; 
    } else if (value > 5) {
      return 'rgba(255, 206, 86, 0.8)'; 
    } else {
      return 'rgba(255, 99, 132, 0.8)'; 
    }
  });

  const data = {
    labels: ['Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov'],  
    datasets: [
      {
        label: 'Sales',
        data: values,  
        backgroundColor: backgroundColors, 
        borderColor: backgroundColors.map(color => color.replace('0.8', '1')), 
        borderRadius: 10,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: false, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        grid: {
          display: false, 
        },
        beginAtZero: true,
        ticks: {
          display: false, 
        },
      },
    },
  };


  return <Bar data={data} options={options} />;
};

export default GraphBar;
