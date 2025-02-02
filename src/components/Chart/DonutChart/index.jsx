import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartContainer, ChartWrapper, LegendContainer, LegendItem, LegendColorBox } from '../../../styles/Chart/DonutChart/style'; // 수정된 경로
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const colors = [
  '#142755', '#FFB55D', '#F17357', '#B75075', '#6C3971', 
  '#D78BCB', '#F4A4DA', '#828ED2', '#EBEEFF', '#F9F9DF', 
  '#FFEA82', '#B1EB81'
];

const DonutChart = ({ categoryData, activeButton }) => {
  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData).map(data => (activeButton === 'expense' ? data.spent : data.earned)),
        backgroundColor: Object.keys(categoryData).map((_, index) => colors[index % colors.length]), // 카테고리 색상 순서 설정
        borderWidth: 0,
      },
    ],
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false }, 
    },
    cutout: '53%',
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <Pie data={pieChartData} options={pieChartOptions} />
      </ChartWrapper>
      <LegendContainer>
        {Object.entries(categoryData).map(([category, data], index) => (
          <LegendItem key={index}>
            <LegendColorBox style={{ backgroundColor: colors[index % colors.length] }} /> {/* 색상 순서 설정 */}
            <span style={{ color: '#767676' }}>{category}</span>
            <span style={{ marginLeft: '130px', color: '#767676' }}>
              {activeButton === 'expense' ? data.spent.toLocaleString() : data.earned.toLocaleString()}원
            </span>
          </LegendItem>
        ))}
      </LegendContainer>
    </ChartContainer>
  );
};

export default DonutChart;
