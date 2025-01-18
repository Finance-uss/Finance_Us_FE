import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingContainer, Title, ButtonGroup, Button } from '../../../styles/User/SettingOption/style';

const SettingOption = ({ title, options, multiRow }) => {
  const navigate = useNavigate();

  return (
    <SettingContainer>
      <Title>{title}</Title>
      <ButtonGroup multiRow={multiRow}>
                {options.map((option) => (
                    <Button key={option.label} onClick={() => navigate(option.path)}>
                        {option.label}
                    </Button>
                ))}
            </ButtonGroup>
    </SettingContainer>
  );
};

export default SettingOption;