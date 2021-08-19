import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DATE_OPTION, DAY_OPTION, TIME_OPTION } from "utils/constants";
import { getDate } from "utils/date";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TimeText = styled(DateText)``;

const TodoHead = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TodoHeadBlock>
      <DayText>{getDate(date, DAY_OPTION)}</DayText>
      <DateText>{getDate(date, DATE_OPTION)}</DateText>
      <TimeText>{getDate(date, TIME_OPTION)}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
