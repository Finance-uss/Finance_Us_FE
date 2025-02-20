import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDate } from '../../../contexts/DateContext'; 
import { Container, TopSection } from '../../../styles/Statistics/style';
import TopBar from '../../../components/common/TopBar';
import FinanceButton from '../../../components/common/FinanceButton';
import NavBar1 from '../../../components/common/NavBar1';
import NavBar2 from '../../../components/common/NavBar2'; 
import SearchHeader from '../../../components/common/SearchHeader';
import DonutChart from '../../../components/Chart/DonutChart';
import BarChart from '../../../components/Chart/BarChart';
import Category from '../../../components/Stat/Category'; 
import BottomBar from '../../../components/common/BottomBar';
import { getStatisticsData, getGoalStatisticsData, getCategoryGoalData } from '../../../api/statistics';
import { getPeriodStatisticsData } from '../../../api/periodStatistics'; 
import { useAuth } from '../../../contexts/AuthContext'; 

const StatMain = () => {
  const navigate = useNavigate();
  const { selectedDate } = useDate();
  const { formData } = useAuth();

  const [state, setState] = useState({
    categoryData: {},
    activeButton: 'expense',
    totalAmount: 0,
    goalAmount: 0,
    progressPercentage: 0,
    selectedTab: 0,
    periodStartYear: new Date().getFullYear(),
    periodStartMonth: new Date().getMonth() + 1,
    periodEndYear: new Date().getFullYear(),
    periodEndMonth: new Date().getMonth() + 1,
    periodData: [],
    selectedMonthData: [],
  });

  const fetchData = async (year, month, type) => {
    try {
      const [statisticsData, categoryGoalData, totalSpentData] = await Promise.all([
        getStatisticsData(formData.token, year, month, type),
        getCategoryGoalData(formData.token, year, month, type),
        getGoalStatisticsData(formData.token, year, month, type),
      ]);

      let totalSpent = totalSpentData.isSuccess ? totalSpentData.result.totalSpent || 0 : 0;
      const updatedCategoryData = {};

      if (categoryGoalData.isSuccess && categoryGoalData.result) {
        categoryGoalData.result.categories.forEach(category => {
          updatedCategoryData[category.mainCategory] = {
            spent: category.totalSpent || 0,
            goal: category.goal || 0,
            percentage: category.percentage || 0,
            earned: statisticsData.result.categories.find(cat => cat.mainCategory === category.mainCategory)?.totalSpent || 0,
          };
        });
      }

      const goalAmount = totalSpentData.isSuccess ? (totalSpentData.result.goal || 0) : 0; 
      const progressPercentage = totalSpentData.isSuccess ? (totalSpentData.result.percentage || 0) : 0; 

      setState(prevState => ({
        ...prevState,
        categoryData: updatedCategoryData,
        goalAmount,
        totalAmount: totalSpent,
        progressPercentage,
      }));

    } catch (error) {
      console.error("데이터 조회 실패:", error);
      setState(prevState => ({
        ...prevState,
        categoryData: {},
        goalAmount: 0,
        totalAmount: 0,
        progressPercentage: 0,
      }));
    }
  };

  const fetchPeriodData = async (startYear, startMonth, endYear, endMonth, type) => {
    try {
      const data = await getPeriodStatisticsData(formData.token, startYear, startMonth, endYear, endMonth, type);
      setState(prevState => ({
        ...prevState,
        periodData: Array.isArray(data.result.monthlyData) ? data.result.monthlyData : [],
      }));
    } catch (error) {
      console.error("기간 데이터 조회 실패:", error);
    }
  };

  const handleDateChange = (year, month) => {
    if (state.selectedTab === 0) {
      fetchData(year, month, state.activeButton);
    }
  };

  const handleFinanceButtonClick = (buttonType) => {
    setState(prevState => ({ ...prevState, activeButton: buttonType }));
    if (state.selectedTab === 0) {
      fetchData(selectedDate.year, selectedDate.month, buttonType);
    }
  };

  const handleTabClick = (index) => {
    setState(prevState => ({ ...prevState, selectedTab: index }));
    if (index === 0) {
      fetchData(selectedDate.year, selectedDate.month, state.activeButton);
    } else if (index === 1) {
      fetchPeriodData(state.periodStartYear, state.periodStartMonth, state.periodEndYear, state.periodEndMonth, state.activeButton);
    }
  };

  useEffect(() => {
    if (state.selectedTab === 0) {
      fetchData(selectedDate.year, selectedDate.month, state.activeButton);
    }
  }, [state.selectedTab, selectedDate, state.activeButton]);

  return (
    <Container>
      <SearchHeader />
      <TopSection style={{ gap: '20px' }}>
        <TopBar 
          leftText="카테고리" 
          rightText="기간" 
          onTabClick={handleTabClick} 
          selectedTab={state.selectedTab} 
        />
        <FinanceButton 
          activeButton={state.activeButton} 
          setActiveButton={handleFinanceButtonClick} 
        />
      </TopSection>

      {state.selectedTab === 0 && (
        <NavBar1 
          marginTop="20px" 
          modalTop="25px" 
          onDateChange={handleDateChange} 
        />
      )}

      {state.selectedTab === 1 && (
        <NavBar2 
          marginTop="16px" 
          onPeriodChange={(startYear, startMonth, endYear, endMonth) => {
            setState(prevState => ({
              ...prevState,
              periodStartYear: startYear,
              periodStartMonth: startMonth,
              periodEndYear: endYear,
              periodEndMonth: endMonth,
              selectedMonthData: [], 
              totalAmount: 0, 
              progressPercentage: 0, 
            }));
          }} 
          onConfirm={() => {
            fetchPeriodData(state.periodStartYear, state.periodStartMonth, state.periodEndYear, state.periodEndMonth, state.activeButton);
          }} 
        />
      )}

      {state.selectedTab === 0 && <DonutChart categoryData={state.categoryData} activeButton={state.activeButton} />}

      {state.selectedTab === 1 && (
        <BarChart 
          token={formData.token} 
          startDate={{ year: state.periodStartYear, month: state.periodStartMonth }} 
          endDate={{ year: state.periodEndYear, month: state.periodEndMonth }} 
          type={state.activeButton} 
        />
      )}

      {state.selectedTab === 0 && (
        <Category 
          selectedDate={selectedDate} 
          activeButton={state.activeButton} 
          categoryData={state.categoryData} 
          totalAmount={state.totalAmount} 
          goalAmount={state.goalAmount} 
          progressPercentage={state.progressPercentage} 
        />
      )}

      <BottomBar />
    </Container>
  );
};

export default StatMain;
