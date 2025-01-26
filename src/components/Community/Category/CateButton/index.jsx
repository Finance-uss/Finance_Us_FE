import React, { useState } from 'react'; 
import { ButtonWrapper, Button } from '../../../../styles/Community/Category/CateButton/style';
import PostList from '../../Board/PostList';

const CateButton = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const handleClick = (category) => {
    // 동일한 카테고리를 두 번 클릭하면 취소
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <>
      <ButtonWrapper>
        {categories.map((category) => (
          <Button
            key={category}
            isClick={selectedCategory === category}
            onClick={() => handleClick(category)}
          >
            {category}
          </Button>
        ))}
      </ButtonWrapper>
      <PostList selectedCategory={selectedCategory} />
    </>
  );
};

export default CateButton;
