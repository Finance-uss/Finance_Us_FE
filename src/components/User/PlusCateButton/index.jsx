import React from 'react';
import { PlusButtonContainer, StyledPlusCateButton, PlusCate } from '../../../styles/User/PlusCateButton/style';
import plusCate from '../../../assets/icons/common/User/PlusCate.svg';

const PlusCateButton = ({ onClick }) => {
    return (
        <PlusButtonContainer>
            <StyledPlusCateButton onClick={onClick}>
                <PlusCate src={plusCate} />
            </StyledPlusCateButton>
        </PlusButtonContainer>
    );
};

export default PlusCateButton;
