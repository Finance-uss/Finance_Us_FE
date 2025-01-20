import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from '../../../styles/Community/SearchBar/style';
import BeforeIcon from '../../../assets/icons/common/Before.svg';
import SearchIcon from '../../../assets/icons/common/Search.svg';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const MAX_RECENT_SEARCHES = 10; // 최대 최근 검색어 개수 설정
  
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);
  
  const updateRecentSearches = (newSearches) => {
    setRecentSearches(newSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  };
  
  const handleSearch = (e) => {
    setValue(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !recentSearches.includes(value)) {
      updateRecentSearches([value, ...recentSearches.slice(0, MAX_RECENT_SEARCHES - 1)]);
    }
    setValue('');
  };
  
  const handleRecentClick = (search) => {
    setValue(search);
  };
  
  const handleDeleteRecent = (search) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    updateRecentSearches(updatedSearches);
  };

  return (
    <S.Container>
      {/* <S.SearchBarContainer></S.SearchBarContainer> */}
      <form onSubmit={handleSearchSubmit}>
        <S.Input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="검색할 내용을 작성해주세요."
        />
        <S.Button type="submit">
          <img src={SearchIcon} alt="검색" />
        </S.Button>
      </form>
      <strong>최근 검색</strong>
      {recentSearches.legnth === 0 && <div>최그 ㄴ 검색 결과가 없습니다.</div>}
      {recentSearches.length > 0 && (
        <S.RecentSearchesContainer>
          <S.List>
            {recentSearches.map((search, index) => (
              <S.ListItem key={index}>
                <S.SearchText onClick={() => handleRecentClick(search)}>
                  {search}
                </S.SearchText>
                <S.DeleteButton onClick={() => handleDeleteRecent(search)}>
                  ✕
                </S.DeleteButton>
              </S.ListItem>
            ))}
          </S.List>
        </S.RecentSearchesContainer>
      )}
    </S.Container>
  );
};

export default SearchBar;
