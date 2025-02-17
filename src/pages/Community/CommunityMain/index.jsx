import React, { useState, useEffect } from 'react';
import { Container, ProfileList } from '../../../styles/Community/CommunityMain/style';
import Profile from '../../../components/Community/Profile';
import SearchHeader from '../../../components/common/SearchHeader';
import BottomBar from '../../../components/common/BottomBar';
import TopBar from '../../../components/common/TopBar';
import FloatingButton from '../../../components/common/FloatingButton/CommunityWriteButton';
import CateButton from '../../../components/Community/Category/CateButton';
import { getFollowList } from "../../../api/apiFollow"; 
import defaultImage from "../../../assets/icons/common/Community/commentProfile.svg";
import PostList from '../../../components/Community/Board/PostList';

const CommunityMain = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);  
    const [followList, setFollowList] = useState([]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    setSelectedCategory(null);
  };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFollowList();
                console.log("팔로우 목록:", data);
                if (Array.isArray(data)) {
                    setFollowList(data);
                } else {
                    console.error("API 응답 데이터가 예상과 다릅니다.", data);
                }
            } catch (error) {
                console.error("팔로우 목록을 가져오는 중 오류 발생:", error);
            }
            };
        
            fetchData();
    }, []);
  const categoryFreeBoard = ['자유', '정보', '낭비했어요', '절약했어요'];
  const categoryInfoBoard = ['칼럼', '강연', '홍보'];

  return (
    <Container>
      <SearchHeader/>
      <ProfileList>
      {followList.length === 0 ? ( 
                <Profile image={defaultImage} name="친구 추가"/>
            ) : (
                followList.map((user) => (
                    <Profile 
                        key={user.followingId} 
                        image={user.profileImage || defaultImage} 
                        name={user.name} 
                        followingId={user.followingId} 
                    />
                ))
            )}      </ProfileList>
      <TopBar
        leftText="자유게시판"
        rightText="정보게시판"
        onTabClick={handleTabClick}
        selectedTab={selectedTab}
      />
      {/* selectedTab 값에 따라 다른 카테고리 버튼 렌더링 */}
      {selectedTab === 0 && <CateButton categories={categoryFreeBoard} setSelectedCategory={setSelectedCategory}/>
      }
      {selectedTab === 1 && <CateButton categories={categoryInfoBoard} setSelectedCategory={setSelectedCategory}/>}

      {/* 선택된 카테고리에 맞는 게시글 목록 렌더링 */}
      <PostList selectedCategory={selectedCategory} postType={selectedTab === 0 ? 'FREE' : 'INFO'} />

      <FloatingButton/>
      <BottomBar/>
    </Container>
  );
};
export default CommunityMain;