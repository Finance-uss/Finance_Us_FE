import React, { useState } from 'react';
import CheckIcon from '../../../../assets/icons/common/Community/checked.svg';
import { RadioGroup, RadioButton } from '../../../../styles/Community/Category/CateSelect/style';

const CateSelct = () => {
  const [selected, setSelected] = useState('');

  const categories = ['자유', '정보', '낭비했어요', '절약했어요', '칼럼', '강연', '홍보'];

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
            <img
              className="check-icon"
              src={CheckIcon} 
              alt="check-icon"
            />
          </div>
          <span>{category}</span>
        </RadioButton>
      ))}
    </RadioGroup>
  );
};

export default CateSelct;