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
              backgroundColor: '#142755', 
              borderRadius: '2px' 
            }} 
          />
        </ProgressBar>
        <Amount>
          <span>{totalAmount.toLocaleString()}원</span> <span>{goalAmount.toLocaleString()}원</span>
        </Amount>
      </TotalProgressContainer>

      <Separator />

      <CategoryProgressContainer>
        <Title style={{ marginTop: '20px' }}>
          {selectedDate.month}월 카테고리 별 목표 {activeButton === 'expense' ? '지출' : '수익'} 현황
        </Title>
        {Object.entries(categoryData).map(([category, data], index) => {
          const percentage = activeButton === 'expense' ? (data.spent / data.goal) * 100 : (data.earned / data.goal) * 100;

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
                <span>{activeButton === 'expense' ? data.spent : data.earned}원</span> <span>{data.goal}원</span>
              </Amount>
            </CategoryBar>
          );
        })}
      </CategoryProgressContainer>
    </>
  );
};

export default Category;
