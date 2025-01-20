import React from "react";
import * as S from '../../../../styles/Community/SearchPreview/style';

const post = [
  {id:1, category:"자유", title:"멍청소비 줄여야 하는데", preview:"너네는 멍청비용 어떻게 줄임? 돈이 너무 줄줄줄 나간다 너네는 멍청비용 어떻게 줄임? 돈이 너무 줄줄줄 나간다 죽겟다!"},
  {id:2, category:"자유", title:"멍청소비 줄여야 하는데", preview:"멍청멍청 멍청소비 멍청멍청 멍청소비 멍청멍청 멍청소비 멍청멍청 멍청소비"},
  {id:3, category:"자유", title:"멍청소비 줄여야 하는데", preview:"너네는 멍청비용 어떻게 줄임? 돈이 너무 줄줄줄 나간다"},
];

const Preview = () => {
  return (
    <S.Container>
      {post.map((item) => (
        <S.Wrapper key={item.id}>
          <S.Category>{item.category}</S.Category>
          <S.Title>{item.title}</S.Title>
          <S.Preview>{item.preview}</S.Preview>
          <S.Line />
        </S.Wrapper>
      ))}
    </S.Container>
  );
};

export default Preview;
