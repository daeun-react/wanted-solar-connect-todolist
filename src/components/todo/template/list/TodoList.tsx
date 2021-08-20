import React from "react";
import styled from "styled-components";
import { Result } from "antd";
import { SmileTwoTone } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import TodoItem from "components/todo/template/list/item/TodoItem";

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList = ({ toggleTodo, removeTodo, todos }: TodoListProps) => {
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
      {todos &&
        todos.map((todo) => (
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

export default React.memo(TodoList);
