import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as S from '../../../../styles/Community/RecentSearch/style';
import DeleteButton from "../../../../assets/icons/common/Community/delete.svg";

const RecentSearch = () => {
  const [recentSearch, setRecentSearch] = useState([]);
  const MAX_RECENT_SEARCH = 10; // 최근 검색어 최대 개수
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedSearch = localStorage.getItem('recentSearch');
    if (storedSearch) {
      setRecentSearch(JSON.parse(storedSearch));
    }
  }, []);

  const updateRecentSearch = (newSearch) => {
    setRecentSearch(newSearch);
    localStorage.setItem('recentSearch', JSON.stringify(newSearch));
  };

  const handleRecentClick = (search) => {
    navigate(`/search-result?query=${encodeURIComponent(search)}`); 
  };

  const handleDeleteRecent = (search) => {
    const updatedSearch = recentSearch.filter((item) => item !== search);
    updateRecentSearch(updatedSearch);
  };

  return (
    <S.Container>
      <S.Title>최근 검색</S.Title>
      {recentSearch.length === 0 && <S.NotFound>최근 검색어가 없습니다.</S.NotFound>}
      {recentSearch.length > 0 && (
        <S.RecentSearchContainer>
          <S.List>
            {recentSearch.map((search, index) => (
              <S.ListItem key={index}>
                <S.SearchText onClick={() => handleRecentClick(search)}>
                  {search}
                </S.SearchText>
                <S.DeleteButton onClick={() => handleDeleteRecent(search)} src={DeleteButton} alt="삭제"/>
              </S.ListItem>
            ))}
          </S.List>
        </S.RecentSearchContainer>
      )}
    </S.Container>
  );
};

export default RecentSearch;
