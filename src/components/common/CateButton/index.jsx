import React from 'react';
import { ButtonWrapper, Text, CloseIcon } from '../../../styles/common/CateButton/style';
import closeIcon from '../../../assets/icons/common/X.svg';

const CateButton = ({ label = '소분류', onClose, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <Text>{label}</Text>
      <CloseIcon 
        src={closeIcon} 
        alt="close icon" 
        onClick={(e) => {
            e.stopPropagation(); // 부모 버튼의 클릭 이벤트와 분리
            onClose && onClose(); // onClose가 있을 때만 실행
        }}
      />
    </ButtonWrapper>
  );
};

export default CateButton;
