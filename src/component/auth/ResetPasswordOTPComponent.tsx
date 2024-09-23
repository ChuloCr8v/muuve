import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPasswordOTPComponent = () => {
  const [OTP, setOTP] = useState("");

  const [form] = Form.useForm();

  const { email } = useParams();
  const navigate = useNavigate();

  const sharedProps = (value: string) => {
    console.log(value);
  };

  const handleSubmit = () => {
    navigate(`/reset-password/${email}`);
  };

  return (
    <Form
      form={form}
      className="flex flex-col justify-center items-center w-full"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="otp"
        colon={false}
        rules={[{ required: true, message: "Enter OTP" }]}
        className="flex items-center justify-center"
      >
        <Input.OTP
          //formatter={(str) => str.toUpperCase()}
          {...sharedProps}
          size="large"
          value={OTP}
          onChange={(value) => {
            setOTP(value);
            console.log(OTP);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-[380px] h-10 mt-4"
          disabled={OTP.length < 6}
        >
          Submit
        </Button>
      </Form.Item>
      <div className="w-full flex items-center justify-center -mt-2">
        <p className="text-grey">
          Didn't get code?{" "}
          <Button
            size="small"
            className="leading-none px-0 underline text-primary font-semibold underline-offset-2"
            type="link"
          >
            Resend
          </Button>{" "}
          or{" "}
          <Link
            to={"/forgot-password"}
            className="px-0 underline text-primary font-semibold underline-offset-2"
          >
            edit your email address
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default ResetPasswordOTPComponent;
