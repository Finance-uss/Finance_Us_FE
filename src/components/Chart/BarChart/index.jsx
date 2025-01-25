import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartContainer, ChartWrapper } from '../../../styles/Chart/BarChart/style'; // 수정된 경로
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ categoryData, activeButton }) => {
  const barChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: activeButton === 'expense' ? '지출' : '수익',
        data: Object.values(categoryData).map(data => (activeButton === 'expense' ? data.spent : data.earned)),
        backgroundColor: '#F17357',
      },
    ],
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
