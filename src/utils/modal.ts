import { Modal } from "antd";

export const ModalConfirm = (
  content: string,
  id: number,
  removeTodo: (id: number) => void
): void => {
  Modal.confirm({
    title: "DELETE",
    content,
    centered: true,
    onOk() {
      removeTodo(id);
    },
    onCancel() {
      return false;
    },
  });
};

export const ModalError = (content: string, okFunc: () => void): void => {
  Modal.error({
    title: "ERROR",
    content,
    centered: true,
    onOk() {
      okFunc();
    },
  });
};
