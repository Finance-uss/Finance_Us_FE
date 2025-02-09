import React, { useState, useEffect } from 'react';
import { Container, ProfileList } from '../../../styles/Community/CommunityMain/style';
import Profile from '../../../components/Community/Profile';
import icon from '../../../assets/icons/common/Community/exam.png';
import SearchHeader from '../../../components/common/SearchHeader';
import BottomBar from '../../../components/common/BottomBar';
import TopBar from '../../../components/common/TopBar';
import FloatingButton from '../../../components/common/FloatingButton/CommunityWriteButton';
import CateButton from '../../../components/Community/Category/CateButton';
import { useAuth } from "../../../contexts/AuthContext"; 
import { getFollowList } from "../../../api/apiFollow"; 
import exam from "../../../assets/icons/common/Community/exam.png";
import defaultImage from "../../../assets/icons/common/Community/commentProfile.svg";

const CommunityMain = () => {
    const [selectedTab, setSelectedTab] = useState(0); 
    const [followList, setFollowList] = useState([]);
    const { formData } = useAuth(); 
    const accessToken = formData.token; 

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    //임시 데이터 사용
    // const fakeFollowData = [
    //     { followingId: 1, username: '친구1', profileImageUrl: exam },
    //     { followingId: 2, username: '친구2', profileImageUrl: exam },
    //     { followingId: 3, username: '친구3', profileImageUrl: exam },
    //     { followingId: 4, username: '친구4', profileImageUrl: null },
    //     { followingId: 5, username: '친구5', profileImageUrl: exam },
    //     { followingId: 6, username: '친구6', profileImageUrl: exam },
    //     { followingId: 7, username: '친구7', profileImageUrl: exam },
    //     { followingId: 8, username: '친구8', profileImageUrl: null },
    // ];

    // useEffect(() => {
    //     const fetchData = () => {
    //         setFollowList(fakeFollowData);
    //     };

    //     fetchData();
    // }, [accessToken]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken) { 
                    const data = await getFollowList(accessToken);
                    setFollowList(data);
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
                        <Profile key={user.userId} image={user.profileImageUrl||defaultImage} name={user.username} />
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
