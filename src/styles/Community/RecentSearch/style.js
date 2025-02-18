import styled from 'styled-components';

export const Container = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:calc(100%-40px);
    height:auto;
    padding: 44px 20px 24px 20px;
`;
export const Wrapper = styled.div`
    padding-top:20px;
`;
export const Title = styled.div`
    font-size:16px;
    font-weight:500;
    color: #5C5C5C;
`;
export const NotFound =styled.div`
    margin-top:12px;
    align-items:center;
    font-size:14px;
    font-weight:400;
    color: #5C5C5C;
`;
export const RecentSearchContainer = styled.div`
  margin-top: 12px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
  font-size: 14px;
  font-weight:400px;
`;

export const SearchText = styled.span`
  cursor: pointer;
  color: #5c5c5c;
`;

export const DeleteButton = styled.img`
    width:13.13px;
    height:13.13px;
    cursor: pointer;
`;