import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import CustomLabel from "./CustomLabel";

interface Props {
  handleSubmit: (passwordData: {
    password: string;
    confirmPassword: string;
  }) => void;
}

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

const PasswordComponent = ({ handleSubmit }: Props) => {
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

  return (
    <Form
      className="max-w-[480px] w-full"
      layout="vertical"
      onFinish={() => handleSubmit(passwordData)}
    >
      <Form.Item label={<CustomLabel label={"Password"} required />}>
        <Input.Password
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </Form.Item>
      <div className="space-y-1 mb-4">
        {validPasswordChecks.map((item) => (
          <div className="flex items-center gap-2" key={item.id}>
            <Checkbox checked={checked.includes(item.id)} />
            <p className="text-grey text-sm">{item.label}</p>
          </div>
        ))}
      </div>
      <Form.Item
        label={<CustomLabel label={"Comfirm Password"} required />}
        extra={
          passwordData.confirmPassword &&
          passwordData.password !== passwordData.confirmPassword && (
            <span className="text-red-600 mt-1 block">
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
        className="w-full"
        type="primary"
        htmlType="submit"
        disabled={isFormDataComplete()}
      >
        Proceed
      </Button>
    </Form>
  );
};

export default PasswordComponent;
