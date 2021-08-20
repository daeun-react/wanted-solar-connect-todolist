import React, { useState } from "react";
import styled from "styled-components";
import { Result, Button } from "antd";
import { SmileTwoTone, CaretDownOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import TodoItem from "components/todo/template/list/item/TodoItem";

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

type ButtonTypeProps =
  | "default"
  | "link"
  | "text"
  | "ghost"
  | "primary"
  | "dashed"
  | undefined;

const TodoList = ({ toggleTodo, removeTodo, todos }: TodoListProps) => {
  const [sortType, setSortType] = useState("id");

  const ButtonType = (type: string): ButtonTypeProps =>
    sortType === type ? "primary" : "default";

  const onButtonClick = (type: string) => setSortType(type);

  const onSort = (prev: Itodo, next: Itodo) =>
    sortType === "id"
      ? prev.id - next.id
      : Date.parse(prev.deadline.toString()) -
        Date.parse(next.deadline.toString());

  if (todos.length === 0)
    return (
      <BlockCenter>
        <Result
          icon={
            <SmileTwoTone twoToneColor="#ff6b6b" style={{ fontSize: "60px" }} />
          }
          subTitle="Please add to-do list."
        />
      </BlockCenter>
    );

  return (
    <TodoListBlock>
      <ButtonGroup>
        <Button
          size="small"
          style={{ width: "120px" }}
          danger
          type={ButtonType("id")}
          onClick={() => onButtonClick("id")}
          icon={<CaretDownOutlined />}
        >
          입력순
        </Button>
        <Button
          size="small"
          style={{ width: "120px" }}
          danger
          type={ButtonType("date")}
          onClick={() => onButtonClick("date")}
          icon={<CaretDownOutlined />}
        >
          마감임박순
        </Button>
      </ButtonGroup>
      {todos &&
        todos
          .sort(onSort)
          .map((todo) => (
            <TodoItem
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              key={todo.id}
              todo={todo}
            />
          ))}
    </TodoListBlock>
  );
};

const BlockCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;

  Button + Button {
    margin-left: 4px;
  }
`;

export default React.memo(TodoList);
