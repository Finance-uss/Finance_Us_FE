import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  IconContainer,
  Icon,
  TopSection,
  TotalProgressContainer,
  ProgressBar,
  Amount,
  CategoryProgressContainer,
  CategoryBar,
  CategoryLabel,
  CategoryChartContainer,
  LegendContainer,
  LegendItem,
  LegendColorBox,
} from '../../styles/Statistics/style';
import TopBar from '../../components/common/TopBar';
import FinanceButton from '../../components/common/FinanceButton';
import NavBar from '../../components/common/NavBar';
import SearchIcon from '../../assets/icons/common/Search.svg';
import BellIcon from '../../assets/icons/common/Bell.svg';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Statistics = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  const [totalSpent, setTotalSpent] = useState(0);
  const [goalAmount, setGoalAmount] = useState(1600000);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [activeButton, setActiveButton] = useState('expense');

  // 카테고리 데이터 설정
  const categoryData = {
    식비: { goal: 600000, spent: 360000 },
    카페: { goal: 200000, spent: 120000 },
    쇼핑: { goal: 200000, spent: 120000 },
  };

  useEffect(() => {
    const totalSpent = Object.values(categoryData).reduce(
      (sum, category) => sum + category.spent,
      0
    );
    setTotalSpent(totalSpent);
    setProgressPercentage((totalSpent / goalAmount) * 100);
  }, [selectedDate]);

  // 카테고리 그래프 데이터
  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData).map((data) => data.spent),
        backgroundColor: ['#3f51b5', '#ff9800', '#ff4081'],
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
    cutout: '55%',
  };

  return (
    <Container>
      <IconContainer>
        <Icon
          src={SearchIcon}
          alt="검색 아이콘"
          onClick={() => navigate('/search')}
        />
        <Icon
          src={BellIcon}
          alt="알림 아이콘"
          onClick={() => navigate('/alarm')}
        />
      </IconContainer>
      <TopSection>
        <TopBar leftText="카테고리" rightText="기간" />
        <FinanceButton
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </TopSection>
      <NavBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* 카테고리 그래프 섹션 */}
      <CategoryChartContainer>
        <h3>{activeButton === 'expense' ? '월 목표 총 지출 현황' : '월 목표 총 수익 현황'}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '250px', height: '250px' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
          {/* 범례 */}
          <LegendContainer>
            {Object.entries(categoryData).map(([category, data], index) => (
              <LegendItem key={index}>
                <LegendColorBox
                  style={{
                    backgroundColor: ['#3f51b5', '#ff9800', '#ff4081'][index],
                  }}
                />
                <span>
                  {category}: {data.spent.toLocaleString()}원
                </span>
              </LegendItem>
            ))}
          </LegendContainer>
        </div>
      </CategoryChartContainer>

      {/* 총 수입 현황 */}
      <TotalProgressContainer>
        <ProgressBar $percentage={progressPercentage} />
        <Amount>
          <span>{totalSpent.toLocaleString()}원</span> /{' '}
          <span>{goalAmount.toLocaleString()}원</span>
        </Amount>
      </TotalProgressContainer>

      {/* 카테고리별 수입 현황 */}
      <CategoryProgressContainer>
        <h3>{selectedDate.month}월 카테고리 별 수입 지출 현황</h3>
        {Object.entries(categoryData).map(([category, data]) => (
          <CategoryBar key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            <ProgressBar $percentage={(data.spent / data.goal) * 100} />
            <Amount>
              <span>{Math.min(data.spent, data.goal).toLocaleString()}원</span>{' '}
              / <span>{data.goal.toLocaleString()}원</span>
            </Amount>
          </CategoryBar>
        ))}
      </CategoryProgressContainer>
    </Container>
  );
};

export default Statistics;
