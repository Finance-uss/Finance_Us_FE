import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ChartContainer, ChartWrapper } from '../../../styles/Chart/BarChart/style';

Chart.register(...registerables);

const BarChart = ({ categoryData, startDate, endDate, goalAmount, totalAmount }) => {
  // X축 라벨 생성
  const getFilteredLabels = () => {
    const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    return labels.slice(startDate.month - 1, endDate.month); 
  };

  const getFilteredMonthlyData = () => {
    const filteredData = Array(12).fill(0);
    const startMonth = startDate.month - 1; 
    const endMonth = endDate.month - 1; 

    Object.values(categoryData).forEach(category => {
      for (let month = startMonth; month <= endMonth; month++) {
        filteredData[month] += category.spent || category.earned || 0; 
      }
    });

    return filteredData;
  };

  const filteredMonthlyData = getFilteredMonthlyData();
  const filteredLabels = getFilteredLabels();

  const barChartData = {
    labels: filteredLabels, 
    datasets: [
      {
        label: '지출',
        data: filteredMonthlyData,
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
            size: 16,
            color: '#b4b4b4',
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
