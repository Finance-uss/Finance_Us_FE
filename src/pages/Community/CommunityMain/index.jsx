import React, { useState, useEffect } from 'react';
import { Container, ProfileList } from '../../../styles/Community/CommunityMain/style';
import Profile from '../../../components/Community/Profile';
import SearchHeader from '../../../components/common/SearchHeader';
import BottomBar from '../../../components/common/BottomBar';
import TopBar from '../../../components/common/TopBar';
import FloatingButton from '../../../components/common/FloatingButton/CommunityWriteButton';
import CateButton from '../../../components/Community/Category/CateButton';
import { useAuth } from "../../../contexts/AuthContext"; 
import { getFollowList } from "../../../api/apiFollow"; 
import defaultImage from "../../../assets/icons/common/Community/commentProfile.svg";

const CommunityMain = () => {
    const [selectedTab, setSelectedTab] = useState(0); 
    const [followList, setFollowList] = useState([]);
    const { formData } = useAuth(); 
    const accessToken = formData.token; 

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken) { 
                    const data = await getFollowList(accessToken);
                    console.log("팔로우 목록:", data);
                    if (Array.isArray(data)) {
                        setFollowList(data); 
                    } else {
                        console.error("API 응답 데이터가 예상과 다릅니다.", data);
                    }
                } else {
                    console.error("로그인 정보가 없습니다.");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [accessToken]);
    
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
            )}
            </ProfileList>
            <TopBar 
                leftText="자유게시판" 
                rightText="정보게시판" 
                onTabClick={handleTabClick} 
                selectedTab={selectedTab} 
            />
            {selectedTab === 0 && <CateButton categories={categoryFreeBoard}/>}
            {selectedTab === 1 && <CateButton categories={categoryInfoBoard}/>}
            
            <FloatingButton/>
            <BottomBar/>
        </Container>
    );
};

export default CommunityMain;
