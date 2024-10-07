import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useResendOrgVerOtpMutation,
  useVerifyOrgMutation,
} from "../../api/auth.api";
import { useAuthState } from "../../api/data/auth";
import { VerifyOrgInput } from "../../api/types";
import { toastApiError } from "../../utils/error.util";

interface Props {
  email: string;
}

const VerificationComponent = ({ email }: Props) => {
  const auth = useAuthState();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");

  const [verify, { isLoading }] = useVerifyOrgMutation();
  const [resendOtp, { isLoading: resendingOtp }] = useResendOrgVerOtpMutation();

  const sharedProps = () => {};

  const [seconds, setSeconds] = useState(120);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsDisabled(false);
    }
  }, [seconds]);

  const handleResendOtp = () => {
    resendOtp()
      .unwrap()
      .then((res) => {
        auth.set(res);
        message.success("OTP sent successfully");
        setSeconds(120);
        setIsDisabled(true);
      })
      .catch(toastApiError);
  };

  const handleSubmit = (values: VerifyOrgInput) => {
    verify(values)
      .unwrap()
      .then(() => {
        navigate(`/org/onboarding/info`);
      })
      .catch(toastApiError);
  };

  return (
    <Form
      className="flex flex-col items-center justify-center gap-2"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="code"
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
        loading={isLoading}
        type="primary"
        htmlType="submit"
        className="w-[480px] h-10"
        disabled={OTP.length < 6}
      >
        Submit
      </Button>
      {email && (
        <div className="flex items-center justify-center w-full">
          <p className="text-grey">
            Didn't get code?{" "}
            <Button
              onClick={handleResendOtp}
              disabled={isDisabled}
              size="small"
              loading={resendingOtp}
              className="rounded-3xl"
            >
              <small>
                {isDisabled ? `Resend in ${seconds}s` : "Resend OTP"}
              </small>
            </Button>
          </p>
        </div>
      )}
    </Form>
  );
};

export default VerificationComponent;
