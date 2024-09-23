import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { ReactNode } from "react";

interface ActionPopupProps {
  open: boolean;
  onCancel: () => void;
  title: string;
  sendButtonText: string;
  children: ReactNode;
  sendButtonStyle?: string;
  icon?: ReactNode;
  onOk?: () => void;
}

const ActionPopup: React.FC<ActionPopupProps> = ({
  open,
  onCancel,
  onOk,
  title,
  sendButtonText,
  children,
  icon,
  sendButtonStyle,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} closeIcon={null}>
      <div className="space-y-6">
        <section className="space-y-2">
          <div className="relative flex items-center space-x-2 text-primary">
            {typeof icon === "string" ? <img src={icon} alt={title} /> : icon}
            <p className="text-[#011810] font-bold text-[20px] capitalize">
              {title}
            </p>
            <CloseOutlined
              className="absolute top-1 right-1 text-xl text-[#777777]"
              onClick={onCancel}
            />
          </div>
          <div>{children}</div>
        </section>

        <section className="flex space-x-3 justify-center py-2">
          <Button type="default" className="w-[144px]" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={onOk}
            type="primary"
            className={`w-[144px] capitalize ${sendButtonStyle}`}
          >
            {sendButtonText}
          </Button>
        </section>
      </div>
    </Modal>
  );
};

export default ActionPopup;
