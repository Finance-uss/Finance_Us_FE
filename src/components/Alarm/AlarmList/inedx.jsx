import React from "react";
import AlarmCard from "../AlarmCard"; 

const AlarmList = () => {
  const alarms = [
    { category: "댓글", title: "멍청소비 줄여야 하는데" },
    { category: "답글", title: "멍청소비 줄여야 하는데" },
    { category: "반응", title: "아폴로 구매" },
    { category: "팔로우", user: "도레미" },
  ];

  return (
    <>
      {alarms.map((alarm, index) => (
        <AlarmCard
          key={index}
          category={alarm.category}
          title={alarm.title}
          user={alarm.user}
        />
      ))}
    </>
  );
};

export default AlarmList;
