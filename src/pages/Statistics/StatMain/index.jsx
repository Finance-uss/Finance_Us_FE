import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDate } from '../../../contexts/DateContext'; 
import { Container, IconContainer, Icon, TopSection } from '../../../styles/Statistics/style';
import TopBar from '../../../components/common/TopBar';
import FinanceButton from '../../../components/common/FinanceButton';
import NavBar1 from '../../../components/common/NavBar1';
import NavBar2 from '../../../components/common/NavBar2'; 
import SearchIcon from '../../../assets/icons/common/Search.svg';
import BellIcon from '../../../assets/icons/common/Bell.svg';
import DonutChart from '../../../components/Chart/DonutChart';
import BarChart from '../../../components/Chart/BarChart';
import Category from '../../../components/Stat/Category'; 
import BottomBar from '../../../components/common/BottomBar';
import { getStatisticsData, getGoalStatisticsData, getCategoryGoalData } from '../../../api/statistics';
import { useAuth } from '../../../contexts/AuthContext'; 

const StatMain = () => {
  const navigate = useNavigate();
  const { selectedDate } = useDate();
  const { formData } = useAuth();

  const initialCategoryData = {
    식비: { spent: 0, goal: 600000 },
    카페: { spent: 0, goal: 200000 },
    쇼핑: { spent: 0, goal: 200000 }
  };

  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [activeButton, setActiveButton] = useState('expense');
  const [totalAmount, setTotalAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchCategoryData = async (year, month, type) => {
    try {
      const data = await getStatisticsData(formData.token, year, month, type);
      setCategoryData(data || initialCategoryData);
    } catch (error) {
      console.error("통계 데이터 조회 실패:", error);
      setCategoryData(initialCategoryData);
    }
  };

  const fetchGoalData = async (year, month, type) => {
    try {
      const goalData = await getGoalStatisticsData(formData.token, year, month, type);
      setGoalAmount(goalData.goal || 0);
    } catch (error) {
      console.error("목표 데이터 조회 실패:", error);
      setGoalAmount(0);
    }
  };

  // 각 카테고리 별 목표 지출/수익 데이터 가져오기
  const fetchCategoryGoalData = async (year, month, type) => {
    try {
      const categoryGoalData = await getCategoryGoalData(formData.token, year, month, type);
      const updatedCategoryData = { ...initialCategoryData };

      // API 응답에 따라 카테고리 데이터 업데이트
      for (const category in categoryGoalData) {
        if (updatedCategoryData[category]) {
          updatedCategoryData[category].goal = categoryGoalData[category].goal || 0;
        }
      }

      setCategoryData(updatedCategoryData);
    } catch (error) {
      console.error("카테고리 목표 데이터 조회 실패:", error);
    }
  };

  const handleDateChange = (year, month) => {
    fetchCategoryData(year, month, activeButton);
    fetchGoalData(year, month, activeButton);
    fetchCategoryGoalData(year, month, activeButton); 
  };

  useEffect(() => {
    const total = Object.values(categoryData).reduce((sum, category) => {
      return sum + (activeButton === 'expense' ? category.spent : category.earned || 0);
    }, 0);
    setTotalAmount(total);
    setProgressPercentage((total / goalAmount) * 100);
  }, [activeButton, categoryData, goalAmount]);

  const handleFinanceButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    fetchCategoryData(selectedDate.year, selectedDate.month, buttonType);
    fetchGoalData(selectedDate.year, selectedDate.month, buttonType);
    fetchCategoryGoalData(selectedDate.year, selectedDate.month, buttonType); 
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <Container>
      <IconContainer>
        <Icon src={SearchIcon} alt="검색 아이콘" onClick={() => navigate('/search')} />
        <Icon src={BellIcon} alt="알림 아이콘" onClick={() => navigate('/alarm')} />
      </IconContainer>
      <TopSection style={{ gap: '20px' }}>
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
        <NavBar1 
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

      {/* 카테고리 화면에서만 프로그래스 바와 관련된 컴포넌트 추가 */}
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
