import React from "react";
import AlarmCard from "../AlarmCard";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 40px;
`;

const AlarmList = ({ alarms, markRead }) => {
  return (
    <Container>
      {alarms?.map((alarm) => (
        <AlarmCard
          key={alarm.id}
          alarm={alarm}
          markRead={markRead} 
        />
      ))}
    </Container>
  );
};

export default AlarmList;
