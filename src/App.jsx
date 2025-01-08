import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import "./index.css";
import Onboarding from "./pages/Onboarding" // 온보딩
import Alarm from "./pages/Alarm"; // 알림 페이지
import Community from "./pages/Community"; // 커뮤니티
import Login from "./pages/Login"; // 로그인
import FindId from "./pages/FindId";   // 아이디 찾기
import FindPW from "./pages/FindPW";  // 비밀번호 찾기
import SignUp from './pages/SignUp'; // 회원가입
import Statistics from './pages/Statistics'; // 통계
import ProfileSetting from './pages/ProfileSetting'; // 프로필 설정
import User from './pages/User'; // 마이페이지
import Finance from './pages/Finance'; // 가계부
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0)

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
          <Route path="/finance" element={<Finance />} />
          {/* 커뮤니티 페이지 */}
          <Route path="/community" element={<Community />} />
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
