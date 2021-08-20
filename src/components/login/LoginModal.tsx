import React, { useRef } from "react";
import { Modal, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface LoginModalProps {
  visible: boolean;
  onLogin: (username: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onLogin }) => {
  const [form] = Form.useForm();
  const inputRef = useRef<Input>(null);

  const okFunc = async () => {
    try {
      const formData = await form.validateFields();
      onLogin(formData.username);
    } catch (errorInfo) {
      inputRef.current?.focus();
    }
  };

  const InputForm = () => (
    <Form id="inputForm" form={form} layout="vertical">
      <Form.Item
        name="username"
        label="name"
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
        ]}
      >
        <Input ref={inputRef} prefix={<UserOutlined />} />
      </Form.Item>
    </Form>
  );

  return (
    <Modal
      title="WELCOME"
      onOk={okFunc}
      maskClosable={false}
      visible={visible}
      centered={true}
    >
      {InputForm()}
    </Modal>
  );
};

export default LoginModal;
