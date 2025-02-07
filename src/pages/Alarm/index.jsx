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
  const userId = 30; // 실제 사용자 ID로 교체 필요..

useEffect(() => {
    const fetchAlarms = async () => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        const size = 10;
        const url = `${API_URL}/api/notifications?size=${size}&userId=${userId}${lastId ? `&lastNotificationId=${lastId}` : ''}`;
        const response = await axiosInstance.get(url);

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
      const response = await axiosInstance.patch(url);

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