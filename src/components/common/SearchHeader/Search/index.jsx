import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../../styles/common/SearchHeader/style';
import SearchIcon from '../../../../assets/icons/common/Search.svg';

const Search= () => {
    const navigate = useNavigate();
    const handleSearchClick = () => {
        navigate("/search");
    };
    return <S.Icon src={SearchIcon} alt="검색 페이지 가기" onClick={handleSearchClick} />;
};

export default Search;
