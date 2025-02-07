import React from "react";
import AlarmCard from "../AlarmCard";

const AlarmList = ({ alarms, markRead }) => {
  return (
    <>
      {alarms?.map((alarm) => (
        <AlarmCard
          key={alarm.id}
          alarm={alarm}
          markRead={markRead} 
        />
      ))}
    </>
  );
};

export default AlarmList;
