import React from "react";
import { useParams } from 'react-router-dom';
import Exam from "../../../assets/icons/common/Community/exam.png";
import BeforeHeader from "../../../components/common/BeforeHeader"; 
import Budget from "../../../components/Community/FollowFinance/Budget";
import Finance from "../../../components/Community/FollowFinance/FinanceCard";
import BottomBar from "../../../components/common/BottomBar";
import { Container } from "../../../styles/Community/FollowFinance/style";

const post = [
  {id:1, title:"단기알바 1일차", image:Exam, preview:"단기 알바로 8만원 벌었어요\n내일도 나가야 해요",like:10,thumbs:20,satisfaction:3},
  {id:2, title:"단기알바 1일차", image:Exam, preview:"단기 알바로 8만원 벌었어요\n내일도 나가야 해요",like:1,thumbs:23,satisfaction:5},
];
const FollowFinance = () => {
  const { name } = useParams();
  
  return(
    <Container>
     <BeforeHeader text={name}/>
     <Budget name={name}  percentage={83} />
     {/* 임시 % 설정 */}
     {post.map((post) => (
      <Finance
        key={post.id}
        title={post.title}
        image={post.image}
        preview={post.preview}
        like={post.like}
        thumbs={post.thumbs}
        satisfaction={post.satisfaction}
      />
    ))}
     <BottomBar/>
    </Container>
  );
};  
export default FollowFinance;