import React, { useState, useEffect, useCallback } from 'react';
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
  const [page, setPage] = useState(1); 
  const navigate = useNavigate();

  const onPostClick = (postId) => {
    navigate(`/community/postdetail/${postId}`);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const [freeResponse, infoResponse] = await Promise.all([
        axiosInstance.get('/api/search/posts', {
          params: { keyword: query, boardType: 'FREE', size: 10, page },
        }),
        axiosInstance.get('/api/search/posts', {
          params: { keyword: query, boardType: 'INFO', size: 10, page },
        }),
      ]);

      if (freeResponse.data.isSuccess && infoResponse.data.isSuccess) {
        const mergedPosts = [...freeResponse.data.result.posts, ...infoResponse.data.result.posts];
        setResultPost(prevPosts => [...prevPosts, ...mergedPosts]); 
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [query, page]);

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

  const loadMorePostsOnScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  useEffect(() => {
    if (query) {
      if (selectedTab === 0) fetchPosts();
      else fetchProfiles();
    }
  }, [query, selectedTab, page, fetchPosts]);

  return (
    <Container onScroll={loadMorePostsOnScroll}>
      <SearchBar />
      <TopBar 
        leftText="제목·내용"
        rightText="프로필"
        selectedTab={selectedTab}
        onTabClick={setSelectedTab}
      />
      <Wrapper>
        {selectedTab === 0 ? (
          resultPost.length > 0 ? (
            <Preview posts={resultPost} onPostClick={onPostClick} />
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
