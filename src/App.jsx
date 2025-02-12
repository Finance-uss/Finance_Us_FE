import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import "normalize.css"
import "./index.css";

import Layout from "./layouts/layout"; // 레이아웃
import Onboarding from "./pages/Onboarding" // 온보딩
import Alarm from "./pages/Alarm"; // 알림 페이지
import Community from "./pages/Community"; // 커뮤니티
import CommunityMain from "./pages/Community/CommunityMain"; // 커뮤니티 메인
import Login from "./pages/Login"; // 로그인
import FindMail from "./pages/FindMail";   // 아이디 찾기
import FindPW from "./pages/FindPW";  // 비밀번호 찾기
import SignUp from './pages/SignUp'; // 회원가입
import SetPW from './pages/SetPW'; // 비번설정 페이지 추가
import NewPW from './pages/NewPW'; // 새로운 비번 바꾸기 페이지지
import StatMain from './pages/Statistics/StatMain'; // 통계
import Statistics from './pages/Statistics';
import ProfileSetting from './pages/ProfileSetting'; // 프로필 설정
import User from './pages/User'; // 마이페이지
import UserMain from './pages/User/UserMain'; // 마이페이지 메인
import CategoryExpensePage from './pages/User/Setting/CategoryExpense'; // 카테고리-지출 설정
import CategoryIncomePage from './pages/User/Setting/CategoryIncome'; // 카테고리-수익 설정
import AssetsPage from './pages/User/Setting/Assets'; // 자산 설정
import ExpensePage from './pages/User/Setting/Expense'; // 지출 목표 금액 설정
import IncomePage from './pages/User/Setting/Income'; // 수익 목표 금액 설정 
import MyPosts from './pages/User/Setting/My'; // 내가 작성한 글
import LikedPosts from './pages/User/Setting/Liked'; // 내가 좋아요한 글
import CommentedPosts from './pages/User/Setting/Commented'; // 내가 댓글 단 글
import ScrappedPosts from './pages/User/Setting/Scrapped'; //내가 스크랩한 글
import CalendarSetPage from './pages/User/Panel/Calendar'; // 캘린더 관리
import ChangeProfilePage from './pages/User/Panel/Profile'; // 프로필 변경
import ChangeEmailPage from './pages/User/Panel/Email'; // 이메일 변경
import ChangePasswordPage from './pages/User/Panel/Password'; // 비밀번호 변경
import Finance from './pages/Finance'; // 가계부
import FinanceMain from './pages/Finance/FinanceMain';
import Report from './pages/Finance/Report';
import HandWrite from './pages/Finance/HandWrite';
import AccountDetail from './pages/Finance/AccountDetail';
import NotFound from './pages/NotFound';
import PostWrite from './pages/Community/PostWrite'; // 글쓰기 페이지
import PostDetail from './pages/Community/PostDetail'; // 글 상세 페이지
import Search from './pages/Search'; // 검색 페이지
import SearchResult from './pages/Search/SearchResult'; // 검색 결과 페이지
import FollowFinance from './pages/Community/FollowFinance'; // 팔로우 가계부 페이지
function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 온보딩 페이지 */}
          <Route path="/" element={<Onboarding />} />
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />
          <Route path="/findMail" element={<FindMail />} />
          <Route path="/findPw" element={<FindPW />} />
          <Route path="/newPw" element={<NewPW />} />
          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/setpw" element={<SetPW />} />
          <Route path="/profileSetting" element={<ProfileSetting />} />

          {/* 가계부 페이지 */}
          <Route path="/finance" element={<Finance />} >
            <Route index element={<FinanceMain />} />
            <Route path="report" element={<Report />} />
            <Route path="handwrite" element={<HandWrite />} />
            <Route path="account/:accountId" element={<AccountDetail />} />
          </Route>

          {/* 커뮤니티 페이지 */}
          <Route path="/community" element={<Community />}>
            <Route index element={<CommunityMain />} />
            <Route path="followfinance/:followingId" element={<FollowFinance />} />
            <Route path="postwrite" element={<PostWrite />} />
            <Route path="postdetail/:postId" element={<PostDetail/>}/>
          </Route>
          {/* 게시글 수정 */}
          <Route path="/update/:postId" element={<PostWrite />} />          
          
          {/* 검색 페이지 */}
          <Route>
            <Route path="/search" element={<Search />} />
            <Route path="/search-result" element={<SearchResult />} />
          </Route>
          
          
          {/* 통계 페이지 */}
          <Route path="/statistics" element={<Statistics />}>
            <Route index element={<StatMain />} />
          </Route>

          {/* 마이페이지 */}
          <Route path="/user" element={<User />}>
              <Route index element={<UserMain />} />
              <Route path="expense-category" element={<CategoryExpensePage />} />
              <Route path="income-category" element={<CategoryIncomePage />} />
              <Route path="assets" element={<AssetsPage />} />
              <Route path="expense" element={<ExpensePage />} />
              <Route path="income" element={<IncomePage />} />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="liked-posts" element={<LikedPosts />} />
              <Route path="commented-posts" element={<CommentedPosts />} />
              <Route path="scrapped-posts" element={<ScrappedPosts />} />
              <Route path="calendar" element={<CalendarSetPage />} />
              <Route path="profile-edit" element={<ChangeProfilePage />} />
              <Route path="email-edit" element={<ChangeEmailPage />} />
              <Route path="password-edit" element={<ChangePasswordPage />} />
          </Route>

          {/* 알림 페이지 */}
          <Route path="/alarm" element={<Alarm />} />
          

        </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App;
