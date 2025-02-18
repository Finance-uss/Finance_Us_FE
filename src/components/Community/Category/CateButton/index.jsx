import React, { useState } from 'react';
import { ButtonWrapper, Button } from '../../../../styles/Community/Category/CateButton/style';

const CateButton = ({ categories, setSelectedCategory }) => {
  const [selectedCategory, setSelected] = useState(null);

  const handleClick = (category) => {
    if (selectedCategory === category) {
      setSelected(null);
      setSelectedCategory(null);
    } else {
      setSelected(category);
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
    </>
  );
};

export default CateButton;
