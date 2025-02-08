import styled from 'styled-components';

export const ProfileList = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: flex-start; 
  width: 100%;
  max-width: 100%;  // 부모 너비에 맞게 조정
  gap: 31px;
  overflow-x: auto;  // 가로 스크롤 추가
  -webkit-overflow-scrolling: touch; // 터치 스크롤 성능 향상
  &::-webkit-scrollbar {
    height: 8px;  // 스크롤바 높이 설정
  }

`;

// export const ProfileList = styled.div`
//   display: flex;
//   flex-direction: row; 
//   justify-content: flex-start; 
//   width: 100%;
//   gap:31px;
// `;
export const Container = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin-bottom: 77px;
    position: relative;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px; // top right bottom left
`;