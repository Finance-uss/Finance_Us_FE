import React from 'react';
import { ButtonWrapper, PlusIcon } from '../../../styles/common/PlusButton/style';
import plusIcon from '../../../assets/icons/common/Vector.svg';

const PlusButton = ({ label = '소분류', onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <PlusIcon 
        src={plusIcon} 
        alt="plus icon" 
        onClick={(e) => {
            e.stopPropagation(); // 부모 버튼의 클릭 이벤트와 분리
            onClick && onClick(); // onClick이 있을 때만 실행
        }}
      />
    </ButtonWrapper>
  );
};

export default PlusButton;
