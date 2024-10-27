import { Modal } from "antd";
import { ReactNode } from "react";
import { usePopup } from "../../context/PopupContext";
import {
  UploaderProvider,
  useUploaderProvider,
} from "../../context/UploadContext";

interface Props {
  title: string;
  children: ReactNode;
  okText?: string;
  onSubmit?: () => void;
  loading?: boolean;
  closable?: boolean;
  isDanger?: boolean;
}

export const CustomModal = ({
  children,
  loading,
  okText,
  onSubmit,
  closable,
  title,
  isDanger = false,
}: Props) => {
  const uploader = useUploaderProvider();

  const { closeModal, isModalOpen } = usePopup();

  return (
    <Modal
      title={title}
      okText={okText || "Submit"}
      onOk={onSubmit}
      okButtonProps={{ danger: isDanger }}
      open={isModalOpen}
      onCancel={closeModal}
      confirmLoading={loading}
      closable={closable}
      maskClosable={closable}
    >
      <UploaderProvider value={uploader}>{children}</UploaderProvider>
    </Modal>
  );
};
