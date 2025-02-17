import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioButton } from '../../../../styles/Community/Category/CateSelect/style';

const CateSelect = ({ isAuth, onCategoryChange, selectedCategory }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    let categoryName = '';
    switch (selectedCategory) {
      case 'FREE': categoryName = '자유'; break;
      case 'INFO': categoryName = '정보'; break;
      case 'WASTE': categoryName = '낭비했어요'; break;
      case 'SAVE': categoryName = '절약했어요'; break;
      case 'COLUMN': categoryName = '칼럼'; break;
      case 'LECTURE': categoryName = '강연'; break;
      case 'PROMOTION': categoryName = '홍보'; break;
      default: categoryName = ''; break; 
    }
    if (categoryName !== selected) {
      setSelected(categoryName);
    }
  }, [selectedCategory]);

  const baseCategory = ['자유', '정보', '낭비했어요', '절약했어요'];
  const authCategory = ['칼럼', '강연', '홍보'];
  const categories = isAuth ? [...baseCategory, ...authCategory] : baseCategory;

  const handleCategory = (category) => {
    onCategoryChange(category);
    setSelected(category);
  };

  return (
    <RadioGroup>
      {categories.map((category) => (
        <RadioButton key={category}>
          <input type="radio" value={category} checked={selected === category} onChange={() => handleCategory(category)}/>
          <div className="circle"></div>
          <span>{category}</span>
        </RadioButton>
      ))}
    </RadioGroup>
  );
};

export default CateSelect;
