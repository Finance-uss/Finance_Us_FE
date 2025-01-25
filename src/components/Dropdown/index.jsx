import React, { useState, useCallback } from "react";
import {
  DropdownContainer,
  DropdownBody,
  DropdownSelect,
  DropdownMenu,
  DropdownItemContainer,
  ItemName
} from "../../styles/Dropdown/style"; 

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
      <DropdownBody onClick={onActiveToggle}>
        {selectedItem ? (
          <ItemName>{selectedItem}</ItemName>
        ) : (
          <DropdownSelect>{placeholder}</DropdownSelect> 
        )}
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
