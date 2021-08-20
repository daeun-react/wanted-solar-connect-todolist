import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { DATE_OPTION, DAY_OPTION, TIME_OPTION } from "utils/constants";
import { getDate } from "utils/date";
import { load } from "utils/localStorage";

interface TodoHeadProps {
  onLogout: () => void;
}

const TodoHead: React.FC<TodoHeadProps> = ({ onLogout }) => {
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
    <>
      <UserBlock>
        <UserName>HELLO, {load("todo-user")}</UserName>
        <LogoutButton onClick={onLogout}>LOGOUT</LogoutButton>
      </UserBlock>
      <TodoHeadBlock>
        <DateBlock>
          <DayText>{getDate(date, DAY_OPTION)}</DayText>
          <DateText>{getDate(date, DATE_OPTION)}</DateText>
        </DateBlock>
        <TimeBlock>{getDate(date, TIME_OPTION)}</TimeBlock>
      </TodoHeadBlock>
    </>
  );
};

const UserBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px 10px 0px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #119955;
  color: white;
`;

const UserName = styled.div`
  &::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 10px;
    background-color: #dae1e6;
    vertical-align: -1px;
  }
`;

const LogoutButton = memo(styled.button`
  height: 32px;
  padding: 4px 8px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 32px;
  font-size: 14px;
  color: #fff;
  outline: none;

  &:hover {
    border: 1px solid #fff;
  }
`);

const TodoHeadBlock = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const DateText = memo(styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`);

const DayText = memo(styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`);

const TimeBlock = styled.div`
  font-size: 16px;
  color: #808080;
  text-align: center;
`;

export default React.memo(TodoHead);
