import React from 'react';
import { InputWrapper, StyledInput, Unit } from '../../../styles/User/AmountInput/style';

const AmountInput = ({ value, onChange }) => {
  return (
    <InputWrapper>
      <StyledInput
        type="number"
        value={value || ''} // value가 undefined일 경우 빈 문자열로 설정
        onChange={(e) => onChange(e.target.value)}
      />
      <Unit>원</Unit>
    </InputWrapper>
  );
};

export default AmountInput;

