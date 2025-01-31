import React from "react";
import * as S from "../../../../styles/Community/SearchPreview/style";
const Preview = ({ posts, onPostClick }) => {
  return (
    <S.Container>
      {posts.length === 0 ? (
        <S.EmptyMessage>검색 결과가 없습니다.</S.EmptyMessage>
      ) : (
        posts.map((item) => (
          <S.Wrapper key={item.id} onClick={() => onPostClick(item.id)}>
            <S.Category>{item.category || "카테고리 없음"}</S.Category>
            <S.Title>{item.title}</S.Title>
            <S.Preview>{item.preview}</S.Preview>
            <S.Line />
          </S.Wrapper>
        ))
      )}
    </S.Container>
  );
};

export default Preview;
