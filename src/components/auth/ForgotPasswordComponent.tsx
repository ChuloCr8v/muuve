import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomLabel from "../onboarding/CustomLabel";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = () => {
    navigate(`/forgot-password/verify-otp/${email}`);
  };

  return (
    <Form layout="vertical" className="w-full" form={form} onFinish={onFinish}>
      <Form.Item
        label={<CustomLabel label="Email" required />}
        name="email"
        rules={[{ required: true, message: "Please input email" }]}
      >
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full mt-2"
        disabled={!email}
      >
        Submit
      </Button>
    </Form>
  );
};

export default ForgotPasswordComponent;
