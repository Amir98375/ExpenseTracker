import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October'],
    values: [10, 20, 15, 25, 30, 35]
  };
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    Chart.register(...registerables);

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: 'Expense Chart',
        datasets: [{
          label: 'Data',
          data: data.values,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }],
 
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: data.labels
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Clean up function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{maxHeight:'200px', maxWidth:'40%', alignItems:'center',margin:'auto'}}>
   <canvas
  ref={chartRef}
 
></canvas>

    </div>
  );
};

export default BarChart;
