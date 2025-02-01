import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BeforeHeader from "../../components/common/BeforeHeader";
import AlarmList from "../../components/Alarm/AlarmList";
import { Container } from "../../styles/Alarm/style";

const API_URL = import.meta.env.VITE_API_URL; 

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = 2; // 실제 사용자 ID로 교체 필요..
  const accessToken = localStorage.getItem("accessToken"); 

    //더미 데이터
  const dummyAlarms = [
    { id: 1, type: "댓글", message: "새로운 댓글이 달렸습니다.", resourceType: "게시글", isRead: false },
    { id: 2, type: "반응", message: "해당 가계부에 느낌을 표시했습니다.", resourceType: "가계부", isRead: false },
    { id: 3, type: "팔로우", message: "", resourceType: "사용자", isRead: false },
    { id: 4, type: "답글", message: "새로운 답글이 달렸습니다.", resourceType: "게시글", isRead: false },
  ];

useEffect(() => {
    const fetchAlarms = async () => {
      if (isLoading) return;

      setIsLoading(true);
       // API 호출 대신 더미 데이터 사용
       setAlarms(dummyAlarms);
       setIsLoading(false);
      try {
        const size = 10;
        const url = `${API_URL}/api/notifications?size=${size}&userId=${userId}${lastId ? `&lastNotificationId=${lastId}` : ''}`;
        const response = await axiosInstance.get(url, {
          headers: {
            "Authorization": `Bearer ${accessToken}`, 
          },
        });

        const data = response.data;
        if (data.isSuccess) {
          setAlarms((prevAlarms) => [...prevAlarms, ...data.result.notifications]);
          setLastId(data.result.lastNotificationId); 
        } else {
          console.error("알림 조회 실패:", data.message);
        }
      } catch (error) {
        console.error("알림 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlarms();
  }, [lastId]);

  const markRead = async (notificationId) => {
    try {
      const url = `${API_URL}/api/notifications/${notificationId}?userId=${userId}`;
      const response = await axiosInstance.patch(url, {}, {
        headers: {
          "Authorization": `Bearer ${accessToken}`, 
        },
      });

      const data = response.data;
      if (data.isSuccess) {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== notificationId));
      } else {
        console.error("알림 읽음 처리 실패:", data.message);
      }
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  return (
    <Container>
      <BeforeHeader text="알림" />
      <div style={{ marginTop: "40px" }}></div>
      <AlarmList alarms={alarms} markRead={markRead} />
      {isLoading && <div>로딩 중..</div>} 
    </Container>
  );
};

export default Alarm;