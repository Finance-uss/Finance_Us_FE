import React from 'react';
import { 
  TotalProgressContainer, 
  ProgressBar, 
  Amount, 
  Title, 
  Separator, 
  CategoryProgressContainer, 
  CategoryBar, 
  CategoryLabel 
} from '../../styles/Statistics/style';

const colors = [
  '#142755', '#FFB55D', '#F17357', '#B75075', '#6C3971', 
  '#D78BCB', '#F4A4DA', '#828ED2', '#EBEEFF', '#F9F9DF', 
  '#FFEA82', '#B1EB81'
];

const Category = ({ selectedDate, activeButton, categoryData, totalAmount, goalAmount, progressPercentage }) => {
  return (
    <>
      <TotalProgressContainer>
        <Title>
          {selectedDate.month}월 목표 총 {activeButton === 'expense' ? '지출' : '수익'} 현황
        </Title>
        <ProgressBar style={{ backgroundColor: '#E9ECF1' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${progressPercentage}%`, 
              backgroundColor: '#ED1B87', 
              borderRadius: '2px' 
            }} 
          />
        </ProgressBar>
        <Amount>
            <span>{(totalAmount || 0).toLocaleString()}원</span> <span>{(goalAmount || 0).toLocaleString()}원</span>
        </Amount>
      </TotalProgressContainer>

      <Separator />

      <CategoryProgressContainer>
        <Title style={{ marginTop: '20px' }}>
          {selectedDate.month}월 카테고리 별 목표 {activeButton === 'expense' ? '지출' : '수익'} 현황
        </Title>
        {Object.entries(categoryData).map(([category, data], index) => {
          const spent = data.spent || 0; 
          const earned = data.earned || 0; 
          const goal = data.goal || 0; 

          // 퍼센트 계산
          const percentage = activeButton === 'expense' 
            ? (goal > 0 ? (spent / goal) * 100 : 100) // 목표가 없으면 100%
            : (goal > 0 ? (earned / goal) * 100 : 0);

          // 디버깅을 위한 콘솔 로그
          console.log(`${category} - Spent: ${spent}, Goal: ${goal}, Percentage: ${percentage}`);

          return (
            <CategoryBar key={category}>
              <CategoryLabel>{category}</CategoryLabel>
              <ProgressBar 
                style={{ 
                  backgroundColor: '#E9ECF1', 
                  borderRadius: '2px', 
                  overflow: 'hidden', 
                  position: 'relative' 
                }} 
              >
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${percentage}%`, 
                    backgroundColor: colors[index % colors.length], 
                    borderRadius: '2px' 
                  }} 
                />
              </ProgressBar>
              <Amount>
                <span>{activeButton === 'expense' ? spent.toLocaleString() : earned.toLocaleString()}원</span> <span>{goal.toLocaleString()}원</span>
              </Amount>
            </CategoryBar>
          );
        })}
      </CategoryProgressContainer>
    </>
  );
};

export default Category;
