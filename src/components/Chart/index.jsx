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
            const updatedLabels = labels.map((label, index) => {
              // 데이터의 인덱스와 범례의 인덱스를 매칭
              const datasetIndex = label.datasetIndex; // 해당 범례의 데이터셋 인덱스
              if (datasetIndex >= 0 && datasetIndex < data.length) {
                const amount = data[datasetIndex].amount.toLocaleString();
                const percentage = ((data[datasetIndex].amount / totalAmount) * 100).toFixed(0);
                label.text = `${label.text} - ${amount}원 (${percentage}%)`; // 금액과 비율 포함
              } else {
                label.text = `${label.text} - 0원 (0%)`; // 데이터가 없을 경우 기본값 설정
              }
              return label;
            });
            return updatedLabels;
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const percentage = ((tooltipItem.raw / totalAmount) * 100).toFixed(0);
            return `${percentage}%`;
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
