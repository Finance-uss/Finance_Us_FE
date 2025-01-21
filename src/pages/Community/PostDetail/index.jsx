import React from "react";

import Exam from "../../../assets/icons/common/Community/exam.png";
import BeforeHeader from "../../../components/common/BeforeHeader";
import BottomBar from "../../../components/common/BottomBar";

const PostDetail = () => {
  return(
    <>
     <BeforeHeader/>
    {/* <Detail/> */}
     {/* <Content category="자유게시판" postName="제목" text="내용"image={Exam} likes={22} comments={3}/> */}
     <BottomBar/>
    </>
  );
};  
export default PostDetail;