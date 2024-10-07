import { Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../api/auth.api";
import { LoginInput } from "../../api/types";
import { useAuthComplete } from "../../hooks/useAuthComplete";
import CustomLabel from "../onboarding/CustomLabel";

interface LoginDetailsProps {
  email: string;
  password: string;
}

export default function Login() {
  const authComplete = useAuthComplete();

  const [login] = useLoginMutation();

  const [loginDetails, setLoginDetails] = useState<LoginDetailsProps>({
    email: "",
    password: "",
  });

  const [form] = Form.useForm();

  const handleInputChange = (name: string, value: string) => {
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (values: LoginInput) => {
    setIsLoggingIn(true);
    await authComplete(login(values).unwrap());
    setIsLoggingIn(false);
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
          className=""
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
        <Link to={"/forgot-password"} className="font-semibold text-primary">
          Forgot Password?
        </Link>
      </div>

      <Button
        loading={isLoggingIn}
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
