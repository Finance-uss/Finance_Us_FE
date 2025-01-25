import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 5px; 
`;

export const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px; 
  background-color: white; 
  cursor: pointer;
  border-bottom: 1px solid #d9d9d9; 
`;

export const DropdownSelect = styled.p`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    color: #b4b4b4; 
    margin: 0; 
`;

export const DropdownMenu = styled.ul`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  z-index: 999;
  padding: 0; 
  margin: 0; 
  list-style-type: none;
`;

export const DropdownItemContainer = styled.li`
  padding: 10px; 
  border-bottom: 1px solid #d9d9d9;
  &:hover {
    background-color: #f0f0f0; 
  }
`;

export const ItemName = styled.p`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    color: #000; 
    margin: 0; 
`;
