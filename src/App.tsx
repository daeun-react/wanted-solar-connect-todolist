import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { load, save, remove } from "utils/localStorage";
import LoginModal from "components/login/LoginModal";
import TodoContainer from "./components/todo/TodoContainer";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const onLogin = (username: string) => {
    save("todo-user", username);
    setIsLogged(true);
  };

  const onLogout = () => {
    remove("todo-user");
    setIsLogged(false);
  };

  useEffect(() => {
    const username = load("todo-user");
    username ? setIsLogged(true) : setLoginModalVisible(true);
  }, [isLogged]);

  const RenderLayout = (
    <div>
      <TodoContainer onLogout={onLogout} />
    </div>
  );

  return isLogged ? (
    RenderLayout
  ) : (
    <LoginModal visible={loginModalVisible} onLogin={onLogin} />
  );
}

export default App;
