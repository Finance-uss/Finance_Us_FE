import React from 'react';
import * as S from '../../../styles/common/SearchHeader/style';
import SearchIconComponent from './Search';
import AlarmIconComponent from './Alarm';

const SearchHeader = () => {
    return (
        <S.HeaderContainer>
            <SearchIconComponent />
            <AlarmIconComponent />
        </S.HeaderContainer>
    );
};

export default SearchHeader;
