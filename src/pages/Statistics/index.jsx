import React, { useState, useEffect } from 'react';
import {
  Container,
  ChartContainer,
  ProgressContainer,
  ProgressBar,
  Amount,
  TopSection,
  NavBarContainer,
} from '../../styles/Statistics/style'; 
import TopBar from '../../components/common/TopBar'; 
import FinanceButton from '../../components/common/FinanceButton'; 
import StatisticsChart from '../../components/Chart'; 
import NavBar from '../../components/common/NavBar';

const Statistics = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  const [activeButton, setActiveButton] = useState('expense'); 
  const [chartData, setChartData] = useState([]); 
  const [totalSpent, setTotalSpent] = useState(0); 
  const [goalAmount, setGoalAmount] = useState(1000000); 
  const [progressPercentage, setProgressPercentage] = useState(0); 

  useEffect(() => {
    const fetchData = () => {
      const data = {
        chart: [
          { category: '식비', amount: Math.random() * 1000000 },
          { category: '카페', amount: Math.random() * 1000000 },
          { category: '쇼핑', amount: Math.random() * 1000000 },
        ],
        totalSpent: Math.random() * 1000000,
        goalAmount: 1000000,
      };

      setChartData(data.chart);
      setTotalSpent(data.totalSpent); 
      setGoalAmount(data.goalAmount); 
      setProgressPercentage((data.totalSpent / data.goalAmount) * 100); 
    };

    fetchData();
  }, [selectedDate]); 
  return (
    <Container>
      <TopSection>
        <TopBar leftText="카테고리" rightText="기간" />
        <FinanceButton activeButton={activeButton} setActiveButton={setActiveButton} />
      </TopSection>
      <NavBarContainer>
        <NavBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> {/* NavBar 추가 */}
      </NavBarContainer>
      <ChartContainer>
        <StatisticsChart data={chartData} /> {/* 차트 컴포넌트 추가 */}
      </ChartContainer>
      <ProgressContainer>
        <ProgressBar $percentage={progressPercentage} />
        <Amount>
          <span>{totalSpent.toLocaleString()}원</span> / <span>{goalAmount.toLocaleString()}원</span>
        </Amount>
      </ProgressContainer>
    </Container>
  );
};

export default Statistics;
