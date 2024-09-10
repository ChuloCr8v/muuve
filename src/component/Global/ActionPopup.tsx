import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined, StopOutlined } from "@ant-design/icons";


interface ActionPopupProps {
  open: boolean;
  onCancel: () => void;
  title: string;
  sendButtonText: string;
  children: React.ReactNode;
  sendButtonStyle?: string;
  icon?: string
}

const ActionPopup: React.FC<ActionPopupProps> = ({
  open,
  onCancel,
  title,
  sendButtonText,
  children,
  icon,
  sendButtonStyle,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
    
    >
        <div className="space-y-[24px]">
        <section className="space-y-[8px]">
        <div className="relative flex items-center space-x-[8px]">
         <img src={icon} alt="" />
          <p className="text-[#011810] font-bold text-[20px]">{title}</p>
          <CloseOutlined className="absolute top-1 right-1 text-[20px] text-[#777777]" onClick={onCancel} />
        </div>
        <div>{children}</div>
      </section>
      <section className="flex space-x-[16px] h-[40px]  justify-end">
        <Button type='default' className='h-full' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='primary' className={`px-8 h-full  ${ sendButtonStyle}`}>
          {sendButtonText}
        </Button>
      </section>

        </div>
     
    </Modal>
  );
};

export default ActionPopup;
