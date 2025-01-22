import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
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
import LogoutPage from './pages/User/Panel/Logout'; // 로그아웃
import DeleteAccountPage from './pages/User/Panel/Delete'; // 회원 탈퇴
import Finance from './pages/Finance'; // 가계부
import FinanceMain from './pages/Finance/FinanceMain';
import HandWrite from './pages/Finance/HandWrite';
import NotFound from './pages/NotFound';
import PostWrite from './pages/Community/PostWrite'; // 글쓰기 페이지
import Search from './pages/Search'; // 검색 페이지

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
            <Route path="handwrite" element={<HandWrite />} />
          </Route>

          {/* 커뮤니티 페이지 */}
          <Route path="/community" element={<Community />}>
            <Route index element={<CommunityMain />} />
            <Route path="postwrite" element={<PostWrite />} />
          </Route>
          
          
          <Route path="/search" element={<Search />} />
          {/* </Route> */}
          
          {/* 통계 페이지 */}
          <Route path="/statistics" element={<Statistics />} />
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
              <Route path="logout" element={<LogoutPage />} />
              <Route path="delete-account" element={<DeleteAccountPage />} />
          </Route>

          {/* 알림 페이지 */}
          <Route path="/alarm" element={<Alarm />} />
          

        </Routes>
    </Router>
    </>
  )
}

export default App;
