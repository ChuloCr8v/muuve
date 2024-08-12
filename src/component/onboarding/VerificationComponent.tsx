import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationComponent = (props: { email?: string }) => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const sharedProps = () => {};

  const handleSubmit = () => {
    navigate(`/org/onboarding/info/${props.email}`);
  };

  return (
    <Form
      className="flex flex-col justify-center items-center"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="otp"
        colon={false}
        rules={[{ required: true, message: "Enter OTP" }]}
        className="flex items-center justify-center"
      >
        <Input.OTP
          formatter={(str) => str.toUpperCase()}
          {...sharedProps}
          size="large"
          onChange={(value) => setOTP(value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-[480px] h-10"
          disabled={OTP.length < 6}
        >
          Submit
        </Button>
      </Form.Item>
      <div className="w-full flex items-center justify-center -mt-4">
        <p className="text-grey">
          Didn't get code?{" "}
          <Button
            className="px-0 underline text-primary font-semibold underline-offset-2"
            type="link"
          >
            Resend or edit your email address
          </Button>
        </p>
      </div>
    </Form>
  );
};

export default VerificationComponent;
