import styled from "styled-components";

export const SubmitButton = styled.button`
  background-color: #142755;
  color: #ffffff;
  border: none;
  border-radius: 6px; 
  padding: 15px 10px;
  width: 100%; 
  height: 46px; 
  font-size: 16px; 
  font-weight: 400;
  font-style: normal;
  line-height: 100%;
  letter-spacing: -0.4px;
  cursor: pointer; 
  text-align: center;
  opacity: ${({ opacity, disabled }) => (disabled ? 0.5 : opacity || 1)};
  

  &:hover {
    background-color: #142755; 
  }

  &:active {
    background-color: #002244; /* 클릭 시 더 어두운 파란색 */
  }

  &:disabled {
    background-color: #cccccc; 
    cursor: not-allowed; 
  }
`;
