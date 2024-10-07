import { Modal } from "antd";
import { ReactNode } from "react";
import { usePopup } from "../../context/PopupContext";

interface Props {
  children: ReactNode;
  okText?: string;
  onSubmit?: () => void;
  loading?: boolean;
  closable?: boolean;
}

export const CustomModal = ({
  children,
  loading,
  okText,
  onSubmit,
  closable,
}: Props) => {
  const { closeModal, isModalOpen } = usePopup();

  return (
    <Modal
      okText={okText || "Submit"}
      onOk={onSubmit}
      open={isModalOpen}
      onCancel={closeModal}
      confirmLoading={loading}
      closable={closable}
      maskClosable={closable}
    >
      {children}
    </Modal>
  );
};
