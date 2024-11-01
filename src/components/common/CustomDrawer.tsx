import { Button, Drawer } from "antd";
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
  width?: number;
}

export const CustomDrawer = ({
  children,
  loading,
  okText = "Submit",
  onSubmit,
  closable,
  title,
  width = 450,
}: Props) => {
  const uploader = useUploaderProvider();

  const { closeDrawer, isDrawerOpen } = usePopup();

  return (
    <Drawer
      title={title}
      open={isDrawerOpen}
      onClose={closeDrawer}
      closable={closable}
      maskClosable={closable}
      width={width}
      footer={
        onSubmit && (
          <div className="text-right">
            <Button
              onClick={closeDrawer}
              disabled={loading}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} loading={loading} type="primary">
              {okText}
            </Button>
          </div>
        )
      }
    >
      <UploaderProvider value={uploader}>{children}</UploaderProvider>
    </Drawer>
  );
};
