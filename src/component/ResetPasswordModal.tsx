import { Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { closeResetPasswordModal } from "../redux/popupSlice";
import ActionPopup from "./Global/ActionPopup";
import CustomLabel from "./onboarding/CustomLabel";
import { useDispatch, useSelector } from "react-redux";
import { popupInterface } from "../types";
import { validPasswordChecks } from "../dummy/validPasswordCheck";
import ConfirmResetPasswordModal from "./ConfirmResetPasswordModal";

const ResetPasswordModal = () => {
  const [confirmResetPasswordModalIsOpen, setConfirmResetPasswordModalIsOpen] =
    useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [checked, setChecked] = useState<number[]>([]);

  const { resetPasswordModalIsOpen } = useSelector(
    (state: popupInterface) => state.popups
  );

  const dispatch = useDispatch();

  const handleChange = (name: string, value: string) => {
    const minLength = /.{12,}/;
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasNumberOrSymbol = /[\d\W]/;

    let newChecked = [];
    if (name === "newPassword") {
      if (minLength.test(value)) newChecked.push(1);
      if (hasLowerCase.test(value)) newChecked.push(2);
      if (hasUpperCase.test(value)) newChecked.push(3);
      if (hasNumberOrSymbol.test(value)) newChecked.push(4);

      setChecked(newChecked);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Validate that required info is provided
  const isFormDataComplete = () => {
    const passwordFields = Object.values(formData).some((item) => item === "");

    if (
      passwordFields ||
      formData.newPassword !== formData.repeatNewPassword ||
      checked.length < 4
    )
      return true;
  };

  const handleResetPassword = () => {
    console.log(formData);
    setConfirmResetPasswordModalIsOpen(false);
    dispatch(closeResetPasswordModal());
  };

  return (
    <div className="">
      <ActionPopup
        open={resetPasswordModalIsOpen}
        onCancel={() => dispatch(closeResetPasswordModal())}
        title={"Reset Password"}
        sendButtonText={"Reeset"}
        actionBtnDisabled={isFormDataComplete()}
        onOk={() => setConfirmResetPasswordModalIsOpen(true)}
      >
        <Form layout="vertical" colon={false}>
          <Form.Item
            label={<CustomLabel label={"Current Password"} required />}
          >
            <Input.Password
              value={formData.currentPassword}
              name="currentPassword"
              onChange={(e) => handleChange("currentPassword", e.target.value)}
            />
          </Form.Item>
          <Form.Item label={<CustomLabel label={"New Password"} required />}>
            <Input.Password
              value={formData.newPassword}
              name="newPassword"
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
          </Form.Item>
          {validPasswordChecks.map((item) => (
            <div className="flex items-center gap-2 " key={item.id}>
              <Checkbox checked={checked.includes(item.id)} />
              <p className="text-grey text-sm">{item.label}</p>
            </div>
          ))}
          <Form.Item
            label={<CustomLabel label={"Repeat New Password"} required />}
            className="mt-2"
            extra={
              formData.repeatNewPassword &&
              formData.repeatNewPassword !== formData.newPassword && (
                <span className="text-red-600 mt-1 block">
                  Passwords don't match!
                </span>
              )
            }
          >
            <Input.Password
              value={formData.repeatNewPassword}
              name="newPassword"
              onChange={(e) =>
                handleChange("repeatNewPassword", e.target.value)
              }
            />
          </Form.Item>
        </Form>
      </ActionPopup>
      <ConfirmResetPasswordModal
        isOpen={confirmResetPasswordModalIsOpen}
        setIsOpen={setConfirmResetPasswordModalIsOpen}
        onOk={handleResetPassword}
      />
    </div>
  );
};

export default ResetPasswordModal;
