import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: calc(100%-40px);
  margin-bottom:20px;
`;
export const InputContainer = styled.div`
  position:relative;
`;
export const Input = styled.input`
  padding: 0 25px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  border-radius: 10px;
  border:none;
  box-shadow: 0px 0px 3px 0px #00000040;

  &::placeholder {
      color: #5C5C5C;
  }
`;

export const BeforeButton = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 9.75px;
  height: 17.25px;
  cursor: pointer;
   z-index: 2;
`;

export const SearchButton = styled.img`
  position: absolute;
  top: 50%; 
  right: 10px; 
  transform: translateY(-50%);
  width: 16.89px;
  height: 16.9px;
  cursor: pointer;

`;

