import React, { useState } from 'react';
import { RadioGroup, RadioButton } from '../../../../styles/Community/Category/CateSelect/style';

const CateSelct = ({ isAuth }) => {
  const [selected, setSelected] = useState('');

  const baseCategory = ['자유', '정보', '낭비했어요', '절약했어요'];

  const authCategory = ['칼럼', '강연', '홍보'];

  const categories = isAuth
    ? [...baseCategory, ...authCategory]
    : baseCategory;

  const handleChange = (value) => {
    setSelected(value);
  };

  return (
    <RadioGroup>
      {categories.map((category) => (
        <RadioButton key={category}>
          <input
            type="radio"
            value={category}
            checked={selected === category}
            onChange={() => handleChange(category)}
          />
          <div className="circle">
          </div>
          <span>{category}</span>
        </RadioButton>
      ))}
    </RadioGroup>
  );
};

export default CateSelct;