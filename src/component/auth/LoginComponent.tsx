import { Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomLabel from "../../component/onboarding/CustomLabel";

interface LoginDetailsProps {
  email: string;
  password: string;
}

export default function Login() {
  const [loginDetails, setLoginDetails] = useState<LoginDetailsProps>({
    email: "",
    password: "",
  });

  const [form] = Form.useForm();

  const handleInputChange = (name: string, value: string) => {
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
    console.log(loginDetails);
  };

  const handleLogin = () => {
    console.log(loginDetails);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleLogin}
      className="w-full"
    >
      <FormItem
        name="email"
        label={<CustomLabel label="Email" required />}
        rules={[{ required: true, message: "Please enter email" }]}
      >
        <Input
          type="email"
          placeholder="Email"
          className="h-8"
          onChange={(e) => handleInputChange("email", e.target.value)}
          allowClear
        />
      </FormItem>

      <FormItem
        name="password"
        label={<CustomLabel label="Password" required />}
        rules={[{ required: true, message: "Please enter password" }]}
      >
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => handleInputChange("password", e.target.value)}
          allowClear
        />
      </FormItem>

      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Checkbox />
          <span className="">Remember Me</span>
        </div>
        <Link to={"/forgot-password"} className="text-primary font-semibold">
          Forgot Password?
        </Link>
      </div>

      <Button
        disabled={!loginDetails.email || !loginDetails.password}
        htmlType="submit"
        className="w-full mt-6"
        type="primary"
      >
        Sign In
      </Button>
    </Form>
  );
}
