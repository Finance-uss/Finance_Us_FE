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
  Title,
  Separator,
} from '../../styles/Statistics/style';
import TopBar from '../../components/common/TopBar';
import FinanceButton from '../../components/common/FinanceButton';
import NavBar from '../../components/common/NavBar';
import SearchIcon from '../../assets/icons/common/Search.svg';
import BellIcon from '../../assets/icons/common/Bell.svg';
import DonutChart from '../../components/Chart/DonutChart';
import BarChart from '../../components/Chart/BarChart';

const Statistics = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const [activeButton, setActiveButton] = useState('expense');
  const [totalAmount, setTotalAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(1600000);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  
  const expenseData = {
    식비: { goal: 600000, spent: 360000 },
    카페: { goal: 200000, spent: 120000 },
    쇼핑: { goal: 200000, spent: 120000 },
  };

  const incomeData = {
    급여: { goal: 2000000, earned: 1500000 },
    투자: { goal: 500000, earned: 300000 },
    기타: { goal: 300000, earned: 200000 },
  };

  const categoryData = activeButton === 'expense' ? expenseData : incomeData;

  useEffect(() => {
    const total = Object.values(categoryData).reduce((sum, category) => {
      return sum + (activeButton === 'expense' ? category.spent : category.earned) || 0;
    }, 0);
    setTotalAmount(total);
    setProgressPercentage((total / goalAmount) * 100);
  }, [activeButton, categoryData]);

  const handleFinanceButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  // 선택한 기간에 맞는 월별 데이터 생성
  const getFilteredMonthlyData = () => {
    const filteredData = Array(12).fill(0);
    const startMonth = selectedDate.month - 1; // 0-indexed
    const endMonth = selectedDate.month - 1; // 0-indexed

    Object.values(categoryData).forEach(category => {
      filteredData[startMonth] += activeButton === 'expense' ? (category.spent || 0) : (category.earned || 0);
    });

    return filteredData;
  };

  // X축 라벨 생성
  const getFilteredLabels = () => {
    const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    return labels.slice(selectedDate.month - 1, selectedDate.month); // 선택된 월에 맞춰 라벨 반환
  };

  const filteredMonthlyData = getFilteredMonthlyData();
  const filteredLabels = getFilteredLabels();

  return (
    <Container>
      <IconContainer>
        <Icon src={SearchIcon} alt="검색 아이콘" onClick={() => navigate('/search')} />
        <Icon src={BellIcon} alt="알림 아이콘" onClick={() => navigate('/alarm')} />
      </IconContainer>
      <TopSection>
        <TopBar 
          leftText="카테고리" 
          rightText="기간" 
          onTabClick={handleTabClick} 
          selectedTab={selectedTab} 
        />
        <FinanceButton 
          activeButton={activeButton} 
          setActiveButton={handleFinanceButtonClick} 
        />
      </TopSection>
      <NavBar 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
      />

      {/* 카테고리 뷰일 때 도넛 차트 표시 */}
      {selectedTab === 0 && <DonutChart categoryData={categoryData} activeButton={activeButton} />}

      {/* 기간 뷰일 때 바 차트 표시 */}
      {selectedTab === 1 && (
        <BarChart categoryData={filteredMonthlyData} labels={filteredLabels} />
      )}

      <TotalProgressContainer>
        <Title>
          {selectedDate.year}년 {selectedDate.month}월 목표 총 {activeButton === 'expense' ? '지출' : '수익'} 현황
        </Title>
        <ProgressBar $percentage={progressPercentage} />
        <Amount>
          <span>{totalAmount.toLocaleString()}원</span> {' '}
          <span>{goalAmount.toLocaleString()}원</span>
        </Amount>
      </TotalProgressContainer>
      <Separator />

      {/* 카테고리별 수입 현황 */}
      <CategoryProgressContainer>
        <Title style={{ marginTop: '20px' }}>
          {selectedDate.year}년 {selectedDate.month}월 카테고리 별 목표 {activeButton === 'expense' ? '지출' : '수익'} 현황
        </Title>
        {Object.entries(categoryData).map(([category, data]) => (
          <CategoryBar key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            <ProgressBar $percentage={activeButton === 'expense' ? (data.spent / data.goal) * 100 : (data.earned / data.goal) * 100} />
            <Amount>
              <span>{Math.min(activeButton === 'expense' ? data.spent : data.earned, data.goal).toLocaleString()}원</span>{' '}
              <span>{data.goal.toLocaleString()}원</span>
            </Amount>
          </CategoryBar>
        ))}
      </CategoryProgressContainer>
    </Container>
  );
};

export default Statistics;
