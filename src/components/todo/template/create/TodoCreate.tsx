import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { DatePicker } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ModalError } from "utils/modal";
import { Itodo } from "components/todo/TodoService";

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId,
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [deadline, setDeadLine] = useState<moment.Moment | null>(null);
  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const disabledDate = (current: moment.Moment): boolean =>
    current && current.valueOf() < new Date().setHours(0, 0, 0, 0).valueOf();

  const handleDateChange = (date: moment.Moment | null, dateString: string) => {
    setDeadLine(date);
    setError(false);
  };

  const handleToggle = () => setOpen(!open);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) {
      const focusInput = () => inputRef.current?.focus();
      ModalError("할 일을 작성해주세요😅", focusInput);
      setError(true);
      return;
    }

    if (!deadline) {
      setOpen(true);
      setError(true);
      return;
    }

    createTodo({
      id: nextId,
      text: value,
      done: false,
      deadline: deadline,
    });
    incrementNextId();

    setValue("");
    setDeadLine(null);
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <DatePickerDiv
            autoFocus
            placeholder="deadline"
            value={deadline}
            onChange={handleDateChange}
            format={"MMM DD, YYYY"}
            open={open}
            onOpenChange={handleToggle}
            disabledDate={disabledDate}
            size="large"
            style={{
              width: "35%",
            }}
          />

          <Input
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
            ref={inputRef}
          />

          <CircleButton error={error}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const DatePickerDiv = styled(DatePicker)`
  input {
    color: #119955;
    &::placeholder {
      color: #dddddd;
    }
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 65%;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
  }
`;

const CircleButton = styled.button<{ error: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.125s all ease-in;

  ${({ error }) =>
    error &&
    css`
      background: #ff6b6b;
      transform: translate(+50%, 0%) rotate(45deg);
    `};
`;

export default React.memo(TodoCreate);
