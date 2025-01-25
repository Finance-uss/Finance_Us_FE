import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js의 요소를 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = ({ data }) => {
  const totalAmount = data.reduce((total, item) => total + item.amount, 0);

  const chartData = {
    labels: data.map(item => item.category), // 카테고리 이름
    datasets: [
      {
        data: data.map(item => item.amount), // 각 카테고리의 금액
        backgroundColor: [
          '#3F51B5', // 색상 설정
          '#FF9800',
          '#F44336',
        ],
        hoverBackgroundColor: [
          '#303F9F',
          '#E65100',
          '#C62828',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // 범례를 보여줍니다
        position: 'bottom', // 범례 위치를 아래로 설정
        labels: {
          boxWidth: 15, // 범례 색상 박스의 너비
          padding: 20, // 범례 항목 간의 간격
          generateLabels: (chart) => {
            const labels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            return labels.map((label, index) => {
              // 데이터의 인덱스와 범례의 인덱스를 매칭
              const amount = data[index]?.amount.toLocaleString() || '0'; // 금액
              label.text = `${data[index]?.category} - ${amount}원`; // 카테고리와 금액만 표시
              return label;
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const amount = tooltipItem.raw.toLocaleString();
            return `${amount}원`; // 툴팁에는 금액만 표시
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default StatisticsChart;
