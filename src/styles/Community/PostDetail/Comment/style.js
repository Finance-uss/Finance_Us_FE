import styled from "styled-components";

export const CommentSection = styled.div`
  padding: 16px;
`;

export const CommentItem = styled.div`
  margin-bottom: 16px;
`;

export const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #4f4f4f;
  margin: 4px 0;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  color: #757575;
`;

export const CommentInputWrapper = styled.div`
  position: fixed;
  bottom: 40px; /* 하단 네비게이션 바 높이 */
  // left: 0;
  width: 100%;
  max-width: 400px;
  background-color: #f7f7f7;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

export const CommentInput = styled.input`
  flex: 1;
  font-family: Pretendard,sans-serif;
  background-color: #f7f7f7;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 8px;
`;

export const CommentSubmit = styled.button`
  border: none;
    background-color: #f7f7f7;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
`;