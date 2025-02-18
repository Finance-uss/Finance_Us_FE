import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 77px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export const Button = styled(Link)`
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: ${(props) => (props.active === "true" ? "#142755" : "#B4B4B4")}; 
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
`;

