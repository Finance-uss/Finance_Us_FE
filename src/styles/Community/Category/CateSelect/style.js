import styled from 'styled-components';

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #b4b4b4; 
  margin-right: 7px;
  margin-bottom:20px;
  input {
    display: none;
  }

  span {
    display: inline-block;
    margin-left: 5px;
   
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
    background-color: #142755;
    border-color: #142755;  
  }

  input:checked + .circle + span {
    color: #142755; 
    font-weight: 500;
  }
`;
