import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ChartContainer, ChartWrapper } from '../../../styles/Chart/BarChart/style';

Chart.register(...registerables);

const BarChart = ({ categoryData, labels }) => {
  const barChartData = {
    labels: labels, // 동적으로 설정된 라벨
    datasets: [
      {
        label: '지출',
        data: categoryData,
        backgroundColor: '#142755',
        borderColor: '#0A1E3F',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: true,
        ticks: {
          display: true,
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            color: '#333',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <Bar data={barChartData} options={barChartOptions} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default BarChart;
