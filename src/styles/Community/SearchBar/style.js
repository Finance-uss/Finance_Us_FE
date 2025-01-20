import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const SearchBarContainer = styled.div`
  
`;
export const SearchContainer = styled.form`
  width:100%;

`;
export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px; 
  cursor: pointer; 
`;
export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: none;
  font-family: 'Pretendard', Arial, sans-serif;
`;

export const Button = styled.button`
  display: flex;
  width: 100%;
  border: none;
  background-color: #ffffff;
`;
export const BeforeButton = styled.img`
    width: 24px;
    height:24px;
`;
export const RecentSearch = styled.div`
  font-size:16px;
  font-weight:500;
`;
export const RecentSearchesContainer = styled.div`
  border-radius: 4px;
  margin-top: 8px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 14px;
`;

export const SearchText = styled.span`
  cursor: pointer;
  color: #5c5c5c;
`;

export const DeleteButton = styled.button`
  border: none;
  background: none;
  color: #b4b4b4;
  cursor: pointer;
`;
