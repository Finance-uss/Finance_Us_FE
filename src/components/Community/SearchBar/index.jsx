import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as S from '../../../styles/Community/SearchBar/style';
import SearchIcon from '../../../assets/icons/common/Community/SearchPrimaryColor.svg';
import BeforeIcon from '../../../assets/icons/common/Before.svg';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [recentSearch, setRecentSearch] = useState([]);
  const MAX_RECENT_SEARCHES = 10;
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedSearch = localStorage.getItem('recentSearch');
    if (storedSearch) {
      setRecentSearch(JSON.parse(storedSearch));
    }

    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setValue(query);
    }
  }, [location.search]);

  const updateRecentSearch = (newSearch) => {
    setRecentSearch(newSearch);
    localStorage.setItem('recentSearch', JSON.stringify(newSearch));
  };
  
  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const handleSearchTrigger = () => {
    if (value.trim() && !recentSearch.includes(value)) {
      updateRecentSearch([value, ...recentSearch.slice(0, MAX_RECENT_SEARCHES - 1)]);
    }
    navigate(`/search-result?query=${encodeURIComponent(value)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchTrigger();
    }
  };
  const handleBackClick = () => {
    if (location.pathname === '/search-result') {
      navigate('/search');
    }else navigate('/community');
  };

  return (
    <S.Container>
      <S.BeforeButton onClick={handleBackClick} src={BeforeIcon} alt="이전페이지" />
      <S.InputContainer>
        <S.Input
          type="text"
          value={value}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="검색할 내용을 작성해주세요."
        />
      </S.InputContainer>
      
      <S.SearchButton onClick={handleSearchTrigger} src={SearchIcon} alt="검색" />
    </S.Container>
  );
};

export default SearchBar;
