import { Modal } from "antd";

export const ModalConfirm = (
  content: string,
  id: number,
  removeTodo: (id: number) => void
): void => {
  const { confirm } = Modal;
  confirm({
    title: "확인!",
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

export const ModalError = (content: string): void => {
  Modal.error({
    title: "에러!",
    content,
    centered: true,
  });
};
