import React, { useState } from "react";
import Content from "../Content";  // Content 컴포넌트 import
import Comment from "../Comment";  // Comment 컴포넌트 import

const Detail = () => {
  const [comments, setComments] = useState([
    { author: "원데이식스필", text: "너도? 나도 ㅋㅋㅋㅋ 내힘들다", date: "2024/11/07 15:59" },
    { author: "김동글", text: "@원데이식스필 우울해 미치겠음", date: "2024/11/07 15:59" },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddComment = (text) => {
    const newComment = {
      author: "김동글",
      text,
      date: new Date().toLocaleString(),
    };
    setComments([...comments, newComment]);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Content
        commentsLength={comments.length}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <Comment comments={comments} handleAddComment={handleAddComment} />
    </>
  );
};

export default Detail;
