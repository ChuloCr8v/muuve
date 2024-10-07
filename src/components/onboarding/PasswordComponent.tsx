import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import CustomLabel from "./CustomLabel";
import { useOnboardOrgMutation } from "../../api/auth.api";
import { toastApiError } from "../../utils/error.util";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../api/data/auth";

const validPasswordChecks = [
  {
    id: 1,
    label: "At least 12 characters",
  },
  {
    id: 2,
    label: "One lowercase character",
  },
  {
    id: 3,
    label: "One uppercase character",
  },
  {
    id: 4,
    label: "One number or symbol character",
  },
];

const PasswordComponent = () => {
  const navigate = useNavigate();
  const auth = useAuthState();

  const onboardData = sessionStorage.getItem("onboard");
  const [onboard, { isLoading }] = useOnboardOrgMutation();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [checked, setChecked] = useState<number[]>([]);

  const handleChange = (name: string, value: string) => {
    const minLength = /.{12,}/;
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasNumberOrSymbol = /[\d\W]/;

    let newChecked = [];
    if (name === "password") {
      if (minLength.test(value)) newChecked.push(1);
      if (hasLowerCase.test(value)) newChecked.push(2);
      if (hasUpperCase.test(value)) newChecked.push(3);
      if (hasNumberOrSymbol.test(value)) newChecked.push(4);

      setChecked(newChecked);
    }

    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  //Validate that required info is provided
  const isFormDataComplete = () => {
    const passwordFields = Object.values(passwordData).some(
      (item) => item === ""
    );

    if (
      passwordFields ||
      passwordData.confirmPassword !== passwordData.password ||
      checked.length < 4
    )
      return true;
  };

  const handleSubmit = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!onboardData) return message.error("Kindly fill previous data");
    const initial = JSON.parse(onboardData);
    const data = { ...initial, password: values.password };
    onboard(data)
      .unwrap()
      .then(() => {
        message.success("Registered Successfully");
        auth.clear();
        sessionStorage.removeItem("onboard");
        navigate("/login", { replace: true });
      })
      .catch(toastApiError);
  };

  return (
    <Form
      className="w-[480px]"
      layout="vertical"
      onFinish={() => handleSubmit(passwordData)}
    >
      <Form.Item label={<CustomLabel label={"Password"} required />}>
        <Input.Password
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </Form.Item>
      <div className="mb-4 space-y-1">
        {validPasswordChecks.map((item) => (
          <div className="flex items-center gap-2" key={item.id}>
            <Checkbox checked={checked.includes(item.id)} />
            <p className="text-sm text-grey">{item.label}</p>
          </div>
        ))}
      </div>
      <Form.Item
        label={<CustomLabel label={"Comfirm Password"} required />}
        extra={
          passwordData.confirmPassword &&
          passwordData.password !== passwordData.confirmPassword && (
            <span className="block mt-1 text-red-600">
              Passwords don't match!
            </span>
          )
        }
      >
        <Input.Password
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </Form.Item>
      <Button
        loading={isLoading}
        className="w-full"
        type="primary"
        htmlType="submit"
        disabled={isFormDataComplete()}
      >
        Submit
      </Button>
    </Form>
  );
};

export default PasswordComponent;
