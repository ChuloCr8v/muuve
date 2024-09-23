import { Button } from "antd";

interface Props {
  isDisabled: boolean;
  handleClick: () => void;
  isLastStep: boolean;
  stepCount: string;
  activeKey: string;
  setActiveKey: (arg0: string) => void;
  handleClose: () => void;
}

const Footer = ({
  isDisabled,
  handleClick,
  stepCount,
  activeKey,
  setActiveKey,
  handleClose,
}: Props) => {
  const handleCancel = () => {
    if (Number(activeKey) > 1) {
      const newActiveKey = Number(activeKey) - 1;
      setActiveKey(newActiveKey.toString());
    } else {
      handleClose;
      return;
    }
  };

  return (
    <div className=" flex items-center justify-end gap-3 my-2">
      <Button className=" w-[100px]" onClick={handleCancel}>
        {Number(activeKey) > 1 ? "Back" : "Cancel"}
      </Button>
      <Button
        onClick={handleClick}
        disabled={isDisabled}
        className=" w-[100px]"
        type="primary"
      >
        {stepCount === activeKey ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default Footer;
