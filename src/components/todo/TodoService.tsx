/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { load, save } from "utils/localStorage";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: moment.Moment;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [nextIdState, setNextIdState] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    setNextIdState((prev) => prev + 1);
  };

  const toggleTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) => prevState.concat(todo));
  };

  const loadData = () => {
    const username = load("todo-user");
    let data = load(`${username}-todos`);
    if (data) {
      initialTodos = JSON.parse(data!);
      setTodoState(initialTodos);
      setNextIdState(
        Math.max(...initialTodos.map((todo: Itodo) => todo.id)) + 1
      );
    } else {
      setTodoState([]);
    }
  };

  const saveData = () => {
    const username = load("todo-user");
    save(`${username}-todos`, JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
