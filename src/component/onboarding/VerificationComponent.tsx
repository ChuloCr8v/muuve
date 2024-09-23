import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerificationComponent = () => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const sharedProps = () => {};

  const { email } = useParams();

  const handleSubmit = () => {
    navigate(`/org/onboarding/successful/${email}`);
  };

  return (
    <Form
      className="flex flex-col justify-center items-center gap-2"
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
      <Button
        type="primary"
        htmlType="submit"
        className="w-[480px] h-10"
        disabled={OTP.length < 6}
      >
        Submit
      </Button>
      <div className="w-full flex items-center justify-center">
        <p className="text-grey">
          Didn't get code?{" "}
          <Button
            className="px-0 underline text-primary font-semibold underline-offset-2"
            type="link"
            onClick={() => navigate("/org/onboarding")}
          >
            Resend or edit your email address
          </Button>
        </p>
      </div>
    </Form>
  );
};

export default VerificationComponent;
