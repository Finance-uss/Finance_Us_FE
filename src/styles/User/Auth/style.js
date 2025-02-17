import styled from 'styled-components';

export const Container = styled.div`
    flex-direction: column;
    width: calc(100% - 40px);
    // height: auto;
    padding: 44px 20px 100px 20px; // top right bottom left
    gap: 20px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top:20px;
`;


export const Title = styled.input`
    width: 100%;
    font-size: 16px;
    border: 0px solid #b4b4b4;
    border-radius: 4px;
    outline: none;
    font-family: 'Pretendard', sans-serif; 

    ::placeholder {
        color: #b4b4b4;

        font-family: 'Pretendard', sans-serif; 
    }
`;

export const Content = styled.textarea`
    width: 100%;
    height:300px;
    font-size: 16px;
    border: 0px solid #b4b4b4;
    font-weight:500;
    border-radius: 4px;
    outline: none;
    resize: none;
    font-family: 'Pretendard', sans-serif; 
    
    ::placeholder {
        font-weight:500;
        font-family: 'Pretendard', sans-serif; 
        color: #b4b4b4;
    }
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    // margin-top:  16px;
    margin-bottom:16px;
    background-color: #b4b4b4;

`;

export const ImagePreview = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    margin-bottom:16px;
`;
export const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: calc(100% - 40px);
    margin-bottom:20px;
`;

export const NoticeContainer = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  text-align: left;
  font-family: 'Pretendard', sans-serif; 
`;

export const NoticeTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
    font-family: 'Pretendard', sans-serif; 
`;

export const NoticeLink = styled.button`
  font-size: 18px;
  margin-top: 5px;
    font-family: 'Pretendard', sans-serif; 
//   font-weight: bold;
  color: black;
//   background-color: #142755;
background-color: #d9d9d9;
  text-decoration: none;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color:rgb(161, 162, 163); 
    // color: gray;
  }
`;



export const NoticeText = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.6;
    font-family: 'Pretendard', sans-serif; 
`;

export const Highlight = styled.span`
  font-weight: bold;
  // color: #007bff;
  color: #142755
`;

// color: white; /* ✅ 글씨 색상을 흰색으로 설정 */
// -webkit-text-stroke: 0.9px #007bff; /* ✅ 글자 테두리를 파란색으로 설정 */
// font-size: 18px; /* ✅ 가독성을 위해 글자 크기 조정 */
// `;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  
`;

export const ListItem = styled.li`
  font-size: 17px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
    font-family: 'Pretendard', sans-serif; 
`;

export const Icon = styled.span`
  color: #007bff;
  margin-right: 8px;
  font-size: 18px;
`;

export const ImageUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 왼쪽 정렬 */
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;
  width: 30px; 
  height: 30px; 
  cursor: pointer;
  background-color: #f9f9f9;
  position: relative;

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const CameraButton = styled.img`
    width: 32px;
    height: 32px;
    top: 100%;
    margin-bottom:16px;
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #F17357;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 12px;

    &:hover {
        background-color: #F17357;
    }
`;

export const ImagePreviewWrapper = styled.div`
    position: relative;
    display: inline-block;
`;