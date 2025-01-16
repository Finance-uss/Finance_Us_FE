import styled from 'styled-components';

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 14px;
  // margin: 14px 0;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #b4b4b4; 

  input {
    display: none;
  }

  input:checked + .circle + span {
    color: #142755; 
    font-weight: 500;
  }

  span {
    display: inline-block;
    margin-left: 7px;
    margin-right:-7px;
  }

  .circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #b4b4b4;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  input:checked + .circle {
    border-color: #142755; 
  }

  .circle .check-icon {
    display: none; 
    width: 12px;
    height: 12px;
  }

  input:checked + .circle .check-icon {
    display: block;
  }
`;
