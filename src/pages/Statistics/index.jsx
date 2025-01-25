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
    day: today.getDate(),
  });
  const [activeButton, setActiveButton] = useState('expense');
  const [totalAmount, setTotalAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(1600000);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isCategoryView, setIsCategoryView] = useState(true); // 카테고리 뷰 여부

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
    const total = Object.values(categoryData).reduce(
      (sum, category) => sum + (activeButton === 'expense' ? category.spent : category.earned),
      0
    );
    setTotalAmount(total);
    setProgressPercentage((total / goalAmount) * 100);
  }, [selectedDate, activeButton]);

  const handleFinanceButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setIsCategoryView(buttonType === 'expense'); // 'expense' 버튼 클릭 시 카테고리 뷰로 설정
  };

  return (
    <Container>
      <IconContainer>
        <Icon src={SearchIcon} alt="검색 아이콘" onClick={() => navigate('/search')} />
        <Icon src={BellIcon} alt="알림 아이콘" onClick={() => navigate('/alarm')} />
      </IconContainer>
      <TopSection>
        <TopBar leftText="카테고리" rightText="기간" />
        <FinanceButton 
          activeButton={activeButton} 
          setActiveButton={handleFinanceButtonClick} // 클릭 핸들러 전달
        />
      </TopSection>
      <NavBar 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
      />

      {/* 카테고리 뷰일 때 도넛 차트 표시 */}
      {isCategoryView && <DonutChart categoryData={categoryData} activeButton={activeButton} />}

      {/* 기간 뷰일 때 바 차트 표시 */}
      {!isCategoryView && <BarChart categoryData={categoryData} activeButton={activeButton} />}

      <TotalProgressContainer>
        <Title>
          {selectedDate.month}월 목표 총 {activeButton === 'expense' ? '지출' : '수익'} 현황
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
          {selectedDate.month}월 카테고리 별 목표 {activeButton === 'expense' ? '지출' : '수익'} 현황
        </Title>
        {Object.entries(categoryData).map(([category, data]) => (
          <CategoryBar key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            <ProgressBar $percentage={(data[activeButton === 'expense' ? 'spent' : 'earned'] / data.goal) * 100} />
            <Amount>
              <span>{Math.min(data[activeButton === 'expense' ? 'spent' : 'earned'], data.goal).toLocaleString()}원</span>{' '}
              <span>{data.goal.toLocaleString()}원</span>
            </Amount>
          </CategoryBar>
        ))}
      </CategoryProgressContainer>
    </Container>
  );
};

export default Statistics;
