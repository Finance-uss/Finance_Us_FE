import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "normalize.css"
import "./index.css";

import Layout from "./layouts/layout"; // 레이아웃
import Onboarding from "./pages/Onboarding" // 온보딩
import Alarm from "./pages/Alarm"; // 알림 페이지
import Community from "./pages/Community"; // 커뮤니티
import CommunityMain from "./pages/Community/CommunityMain"; // 커뮤니티 메인
import Login from "./pages/Login"; // 로그인
import FindId from "./pages/FindId";   // 아이디 찾기
import FindPW from "./pages/FindPW";  // 비밀번호 찾기
import SignUp from './pages/SignUp'; // 회원가입
import Statistics from './pages/Statistics'; // 통계
import ProfileSetting from './pages/ProfileSetting'; // 프로필 설정
import User from './pages/User'; // 마이페이지
import Finance from './pages/Finance'; // 가계부
import FinanceMain from './pages/Finance/FinanceMain';
import Report from './pages/Finance/Report';
import HandWrite from './pages/Finance/HandWrite';
import NotFound from './pages/NotFound';
import PostWrite from './pages/Community/PostWrite'; // 글쓰기 페이지
import PostDetail from './pages/Community/PostDetail'; // 글 상세 페이지
import Search from './pages/Search'; // 검색 페이지
import SearchResult from './pages/Search/SearchResult';

import FollowFinance from './pages/Community/FollowFinance'; // 팔로우 금융 페이지
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          {/* 온보딩 페이지 */}
          <Route path="/onboarding" element={<Onboarding />} />
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />}>
            <Route path="findId" element={<FindId />} />
            <Route path="findPw" element={<FindPW />} />
          </Route>
          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profileSetting" element={<ProfileSetting />} />

          {/* 가계부 페이지 */}
          <Route path="/finance" element={<Finance />} >
            <Route index element={<FinanceMain />} />
            <Route path="report" element={<Report />} />
            <Route path="handwrite" element={<HandWrite />} />
          </Route>

          {/* 커뮤니티 페이지 */}
          <Route path="/community" element={<Community />}>
            <Route index element={<CommunityMain />} />
            <Route path="followfinance/:name" element={<FollowFinance />} />
            <Route path="postwrite" element={<PostWrite />} />
            <Route path="postdetail" element={<PostDetail />} />
          </Route>
          
          {/* 검색 페이지 */}
          <Route>
            <Route path="/search" element={<Search />} />
            <Route path="/search-result" element={<SearchResult />} />
          </Route>
          
          
          {/* 통계 페이지 */}
          <Route path="/statistics" element={<Statistics />} />
          {/* 마이페이지 */}
          <Route path="/user" element={<User />} />

          {/* 알림 페이지 */}
          <Route path="/alarm" element={<Alarm />} />
          

        </Routes>
    </Router>
    </>
  )
}

export default App
