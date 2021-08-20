import React from "react";
import TodoTemplate from "components/todo/template/TodoTemplate";
import TodoHead from "components/todo/template/head/TodoHead";
import TodoCreate from "components/todo/template/create/TodoCreate";
import TodoList from "components/todo/template/list/TodoList";
import TodoFooter from "components/todo/template/footer/TodoFooter";
import { useTodo } from "components/todo/TodoService";

interface TodoContainerProps {
  onLogout: () => void;
}

const TodoContainer = ({ onLogout }: TodoContainerProps) => {
  const {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  } = useTodo();

  return (
    <>
      <TodoTemplate>
        <TodoHead onLogout={onLogout} />
        <TodoCreate
          nextId={nextIdState}
          createTodo={createTodo}
          incrementNextId={incrementNextId}
        />
        <TodoList
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          todos={todoState}
        />
        <TodoFooter todos={todoState} />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
