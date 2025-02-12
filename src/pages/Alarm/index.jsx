import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BeforeHeader from "../../components/common/BeforeHeader";
import AlarmList from "../../components/Alarm/AlarmList";
import { Container } from "../../styles/Alarm/style";
import { useAuth } from "../../contexts/AuthContext";

const Alarm = () => {
  const { formData } = useAuth();
  const token = formData.token;
  const [alarms, setAlarms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 커뮤니티 게시글 타이틀 불러오기
  const fetchPostTitle = async (postId) => {
    try {
      const response = await axiosInstance.get(`/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.result.title;
    } catch (error) {
      console.error(`게시글 ${postId} 조회 실패:`, error);
      return "게시글 정보를 가져올 수 없습니다.";
    }
  };

  // 가계부 타이틀 불러오기
  const fetchAccountTitle = async (accountId) => {
    try {
      const response = await axiosInstance.get(`/api/account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.result.title;
    } catch (error) {
      console.error(`가계부 ${accountId} 조회 실패:`, error);
      return "가계부 정보를 가져올 수 없습니다.";
    }
  };

  const fetchAlarms = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const notifications = response.data.result.notifications;
      const updatedAlarms = await Promise.all(
        notifications.map(async (alarm) => {
          let { resourceType, resourceId } = alarm;
          let title = "알림"; 
          if (resourceType === "ACCOUNT") {
            title = await fetchAccountTitle(resourceId);
          } else if (resourceType === "POST") {
            title = await fetchPostTitle(resourceId);
          }
          return { ...alarm, resourceId, title };
        })
      );
      setAlarms(updatedAlarms);
    } catch (error) {
      console.error("알림 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, [token]);

  return (
    <Container>
      <BeforeHeader text="알림" />
      <AlarmList alarms={alarms} />
      {isLoading && <div>로딩 중..</div>}
    </Container>
  );
};

export default Alarm;
