import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDate } from '../../../contexts/DateContext'; 
import { Container, IconContainer, Icon, TopSection, HistoryContainer, HistoryItem, Title, Separator, Amount } from '../../../styles/Statistics/style';
import TopBar from '../../../components/common/TopBar';
import FinanceButton from '../../../components/common/FinanceButton';
import NavBar from '../../../components/common/NavBar';
import NavBar2 from '../../../components/common/NavBar2'; 
import SearchIcon from '../../../assets/icons/common/Search.svg';
import BellIcon from '../../../assets/icons/common/Bell.svg';
import DonutChart from '../../../components/Chart/DonutChart';
import BarChart from '../../../components/Chart/BarChart';
import Category from '../../../components/Stat/Category'; 
import BottomBar from '../../../components/common/BottomBar';

const StatMain = () => {
  const navigate = useNavigate();
  const { selectedDate } = useDate(); // selectedDate는 DateContext에서 가져온다.
  const today = new Date();

  // 지출 및 수익 데이터 정의
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

  const [activeButton, setActiveButton] = useState('expense');
  const [totalAmount, setTotalAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(1600000);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [categoryData, setCategoryData] = useState(expenseData);

  useEffect(() => {
    const total = Object.values(categoryData).reduce((sum, category) => {
      return sum + (activeButton === 'expense' ? category.spent : category.earned) || 0;
    }, 0);
    setTotalAmount(total);
    setProgressPercentage((total / goalAmount) * 100);
  }, [activeButton, categoryData]);

  const handleFinanceButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setCategoryData(buttonType === 'expense' ? expenseData : incomeData);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleDateChange = (year, month) => {
    // selectedDate에 선택된 날짜 반영
    selectedDate.year = year;
    selectedDate.month = month;
    // 카테고리 데이터 업데이트
    setCategoryData(activeButton === 'expense' ? expenseData : incomeData);
  };

  // 지출 및 수익 내역 예시 (여기서 실제 데이터로 대체할 수 있음)
  const historyData = {
    expense: [
      { date: '2024-02-01', title: '식사', amount: 100000 },
      { date: '2024-02-15', title: '카페', amount: 850000 },
      { date: '2024-02-17', title: '쇼핑', amount: 40000 },
    ],
    income: [
      { date: '2024-02-21', title: '급여', amount: 500000 },
      { date: '2024-02-23', title: '투자', amount: 100000 },
      { date: '2024-02-25', title: '기타', amount: 30000 },
    ],
  };

  return (
    <Container>
      <IconContainer>
        <Icon src={SearchIcon} alt="검색 아이콘" onClick={() => navigate('/search')} />
        <Icon src={BellIcon} alt="알림 아이콘" onClick={() => navigate('/alarm')} />
      </IconContainer>
      <TopSection style={{gap: '20px'}}>
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

      {selectedTab === 0 && (
        <NavBar 
          marginTop="20px" 
          modalTop="25px" 
          onDateChange={handleDateChange} 
        />
      )}

      {selectedTab === 1 && (
        <NavBar2 
          startDate={selectedDate} 
          marginTop="16px" 
          onDateChange={handleDateChange} 
        />
      )}

      {selectedTab === 0 && <DonutChart categoryData={categoryData} activeButton={activeButton} />}

      {selectedTab === 1 && (
        <BarChart 
          categoryData={categoryData} 
          startDate={selectedDate} 
          endDate={selectedDate} 
          goalAmount={goalAmount} 
          totalAmount={totalAmount} 
        />
      )}

      {/* 기간 화면의 내역 표시 */}
      {selectedTab === 1 && (
        <HistoryContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>{selectedDate.month}월 내역</div>
            <Amount style={{ fontSize: '16px', fontWeight: '600' }}>{totalAmount.toLocaleString()}원</Amount>
          </div>
          <Separator />
          {activeButton === 'expense' ? (
            historyData.expense.map((item, index) => (
              <HistoryItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ flex: '0 0 20%', textAlign: 'left' }}>{item.date.split('-')[2]}일</span>
                <span style={{ flex: '1', textAlign: 'center' }}>{item.title}</span>
                <span style={{ flex: '0 0 20%', textAlign: 'right' }}>{item.amount.toLocaleString()}원</span>
              </HistoryItem>
            ))
          ) : (
            historyData.income.map((item, index) => (
              <HistoryItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ flex: '0 0 20%', textAlign: 'left' }}>{item.date.split('-')[2]}일</span>
                <span style={{ flex: '1', textAlign: 'center' }}>{item.title}</span>
                <span style={{ flex: '0 0 20%', textAlign: 'right' }}>{item.amount.toLocaleString()}원</span>
              </HistoryItem>
            ))
          )}
        </HistoryContainer>
      )}

      {/* 카테고리 화면일 때의 카테고리 컴포넌트 */}
      {selectedTab === 0 && (
        <Category 
          selectedDate={selectedDate} 
          activeButton={activeButton} 
          categoryData={categoryData} 
          totalAmount={totalAmount} 
          goalAmount={goalAmount} 
          progressPercentage={progressPercentage} 
        />
      )}

      <BottomBar />
    </Container>
  );
};

export default StatMain;
