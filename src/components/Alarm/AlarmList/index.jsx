import React from "react";
import AlarmCard from "../AlarmCard";
import {AlarmListContainer} from "../../../styles/Alarm/style";

const AlarmList = ({ alarms, markRead }) => {
  return (
    <AlarmListContainer>
      {alarms?.map((alarm) => (
        <AlarmCard
          key={alarm.id}
          alarm={alarm}
          markRead={markRead} 
        />
      ))}
    </AlarmListContainer>
  );
};

export default AlarmList;
