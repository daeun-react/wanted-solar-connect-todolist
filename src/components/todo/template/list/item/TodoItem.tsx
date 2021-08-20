import React from "react";
import styled, { css } from "styled-components";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { ModalConfirm } from "utils/modal";
import { Itodo } from "components/todo/TodoService";
import { getDate } from "utils/date";
import { DATE_OPTION } from "utils/constants";

const Remove = styled.div<{ done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ done }) => (done ? "#ff6b6b" : "#119955")};
  font-size: 16px;

  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const DeadLine = styled.div<{ done: boolean }>`
  margin-right: 8px;
  padding: 2px 10px;
  border-radius: 8px;
  background-color: ${({ done }) => (done ? "#ced4da" : "#33bb77")};
  color: white;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const { id, text, done, deadline } = todo;

  const handleToggle = () => {
    toggleTodo(id);
  };

  const handleRemove = () => {
    ModalConfirm(`"${text}" 할 일을 삭제하시겠습니까? `, id, removeTodo);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={handleToggle}>
        {done && <CheckOutlined />}
      </CheckCircle>
      <DeadLine done={done}>
        {getDate(new Date(Date.parse(deadline.toString())), DATE_OPTION)}
      </DeadLine>
      <Text done={done}>{text}</Text>
      <Remove done={done} onClick={handleRemove}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
