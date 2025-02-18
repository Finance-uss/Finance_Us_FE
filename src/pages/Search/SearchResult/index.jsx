import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TopBar from '../../../components/common/TopBar'; 
import Preview from '../../../components/Community/Search/Preview';
import SearchProfile from '../../../components/Community/Search/SearchProfile';
import SearchBar from '../../../components/Community/SearchBar/index';
import { Container, Wrapper } from '../../../styles/Community/RecentSearch/style';
import axiosInstance from '../../../api/axiosInstance';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; 
  const [selectedTab, setSelectedTab] = useState(0);
  const [resultPost, setResultPost] = useState([]);
  const [resultProfile, setResultProfile] = useState([]);
  const navigate = useNavigate();

  const onPostClick = (postId) => {
    navigate(`/community/postdetail/${postId}`);
  };

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get('/api/search/posts', {
        params: {
          keyword: query,
          boardType: 'FREE',
          size: 10,
        },
      });
      if (response.data.isSuccess) {
        setResultPost(response.data.result.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axiosInstance.get('/api/search/users', {
        params: {
          keyword: query,
          size: 10,
        },
      });
      if (response.data.isSuccess) {
        setResultProfile(response.data.result.users);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchPosts();
      fetchProfiles();
    }
  }, [query]);

  return (
    <Container>
      <SearchBar/>
      <TopBar 
        leftText="제목·내용"
        rightText="프로필"
        selectedTab={selectedTab}
        onTabClick={setSelectedTab}
      />
      <Wrapper>
        {selectedTab === 0 ? (
          resultPost.length > 0 ? (
            <Preview posts={resultPost} onPostClick={onPostClick}/>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )
        ) : resultProfile.length > 0 ? (
          <SearchProfile profiles={resultProfile} />
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
        
      </Wrapper>
    </Container>
  );
};

export default SearchResult;
