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

  const fetchAlarms = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlarms(response.data.result.notifications);
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
