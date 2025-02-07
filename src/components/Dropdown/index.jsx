import React, { useState, useCallback } from "react";
import {
  DropdownContainer,
  DropdownBody,
  DropdownSelect,
  DropdownMenu,
  DropdownItemContainer,
  ItemName
} from "../../styles/Dropdown/style"; 
import dropIcon from '../../assets/icons/common/drop.svg'; // 화살표 아이콘 경로
import styled from 'styled-components'; // styled-components import

const ArrowIcon = styled.img`
  width: 20px; 
  height: 20px; 
  position: absolute; 
  right: 10px; 
  top: 50%; 
  transform: translateY(-50%); 
`;

const Dropdown = ({ items, selectedItem, setSelectedItem, placeholder }) => {
  const [isActive, setIsActive] = useState(false);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((item) => {
    setSelectedItem(item);
    setIsActive(false);
  }, [setSelectedItem]);

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle} style={{ position: 'relative' }}>
        {selectedItem ? (
          <ItemName>{selectedItem}</ItemName>
        ) : (
          <DropdownSelect>{placeholder}</DropdownSelect> 
        )}
        <ArrowIcon src={dropIcon} alt="dropdown arrow" />
      </DropdownBody>
      <DropdownMenu $isActive={isActive}>
        {items.map((item) => (
          <DropdownItemContainer key={item} onClick={() => onSelectItem(item)}>
            <ItemName>{item}</ItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;
