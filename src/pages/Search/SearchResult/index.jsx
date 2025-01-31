import React,{ useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TopBar from '../../../components/common/TopBar'; 
import Preview from '../../../components/Community/Search/Preview';
import SearchProfile from '../../../components/Community/Search/SearchProfile';
import SearchBar from '../../../components/Community/SearchBar/index';
import {Container, Wrapper} from '../../../styles/Community/RecentSearch/style';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")||""; 
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const onPostClick = (postId) => {
    navigate(`/community/postdetail/${postId}`);
};

  const posts = [
    {
      id: 1,
      category: "자유",
      title: "멍청소비 줄여야 하는데",
      preview: "너네는 멍청비용 어떻게 줄임? 돈이 너무 줄줄줄 나간다 너네는 멍청비용 어떻게 줄임? 돈이 너무 줄줄줄 나간다 죽겟다!",
    },
    {
      id: 2,
      category: "자유",
      title: "멍청소비 줄여야 하는데",
      preview: "멍청멍청 멍청소비 멍청멍청 멍청소비 멍청멍청 멍청소비 멍청멍청 멍청소비",
    },
    {
      id: 3,
      category: "자유",
      title: "힘들다",
      preview: "이게 진짜 되나 파이팅 미치겠다",
    },
  ];

  const profiles = [
    {id:1, name:"김동글" ,message:"멍청소비 그만!" ,image: null},
    {id:2, name:"원동글" ,message:"멍청소비 그만!" ,image: null},
    {id:3, name:"윤동글" ,message:"멍청소비 그만!" ,image: null},
  ];

  const resultPost = posts.filter(
    (item) =>
      item.title.includes(query) ||
      item.preview.includes(query)
  );

  const resultProfile = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(query.toLowerCase())
  );

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
