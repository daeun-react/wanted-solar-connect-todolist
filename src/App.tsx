import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { load, save, remove } from "utils/localStorage";
import LoginModal from "components/login/LoginModal";
import TodoContainer from "components/todo/TodoContainer";
import Spinner from "components/common/Spinner";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const onLogin = (username: string) => {
    setLoginModalVisible(false);
    setLoading(true);
    setTimeout(() => {
      save("todo-user", username);
      setIsLogged(true);
      setLoading(false);
    }, 1000);
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
    <>
      <LoginModal visible={loginModalVisible} onLogin={onLogin} />
      {loading && <Spinner mask />}
    </>
  );
};

export default App;
