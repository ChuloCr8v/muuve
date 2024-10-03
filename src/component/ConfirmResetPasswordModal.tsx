import ActionPopup from "./Global/ActionPopup";

type Props = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  onOk: () => void;
};

const ConfirmResetPasswordModal = (props: Props) => {
  return (
    <ActionPopup
      open={props.isOpen}
      onCancel={() => props.setIsOpen(false)}
      title={"Confirm Password Reset"}
      sendButtonText={"Reset Password"}
      onOk={props.onOk}
    >
      Are you sure you want to reset your password?
    </ActionPopup>
  );
};

export default ConfirmResetPasswordModal;
