import React, { useState } from 'react';
import Exam from '../../../assets/icons/common/Community/exam.png';
import TopBar from '../../../components/common/TopBar'; 
import Preview from '../../../components/Community/Search/Preview';
import SearchProfile from '../../../components/Community/Search/SearchProfile';

const SearchResult = () => {
    const [selectedTab, setSelectedTab] = useState(0); 

    const handleLeftClick = () => {
        setSelectedTab(0); // 'Preview' 탭
    };

    const handleRightClick = () => {
        setSelectedTab(1); // 'SearchProfile' 탭
    };

    return (
        <>
            <TopBar 
                    leftText="제목·내용" 
                    rightText="프로필" 
                    onLeftClick={handleLeftClick} 
                    onRightClick={handleRightClick} 
                    selectedTab={selectedTab} 
                />

                {selectedTab === 0 && <Preview />}
                {selectedTab === 1 && (
                    <>
                        <SearchProfile image={Exam} name="김동글" message="멍청소비 그만!" />
                        <SearchProfile name="김동글" message="멍청소비 그만!멍청소비 그만!" />
                    </>
                )}
        </>
            
    );
};

export default SearchResult;
