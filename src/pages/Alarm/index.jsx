import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BeforeHeader from "../../components/common/BeforeHeader";
import AlarmList from "../../components/Alarm/AlarmList";
import { Container } from "../../styles/Alarm/style";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAlarms = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/notifications");
      const notifications = response.data.result.notifications;
      const alarmsWithTitle = notifications.map((alarm) => ({
        ...alarm,
      }));
      setAlarms(alarmsWithTitle); 
    } catch (error) {
      console.error("알림 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
      fetchAlarms();
    }, []);
    const markRead = async (notificationId) => {
      try {
        const response = await axiosInstance.patch(`/api/notifications/${notificationId}`,{},);
        if (response.data.isSuccess) {
          console.log("알림이 읽음으로 표시되었습니다.");
        } else {
          console.error("알림 읽음 처리 실패");
        }
      } catch (error) {
        console.error("알림 읽음 처리 중 오류 발생:", error);
      }
    };
    
  return (
    <Container>
      <BeforeHeader text="알림" />
      <AlarmList alarms={alarms} markRead={markRead} />
      {isLoading && <div>로딩 중..</div>}
    </Container>
  );
};

export default Alarm;
