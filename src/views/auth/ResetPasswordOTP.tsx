import { useParams } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import ResetPasswordOTPComponent from "../../components/auth/ResetPasswordOTPComponent";

const ResetPasswordOTP = () => {
  const { email } = useParams();

  const subheading = (
    <p className="">
      Enter the 6-digit code that was sent to <b>{email}</b>
    </p>
  );
  return (
    <AuthLayout
      showBackBtn
      backURL="/forgot-password"
      formHeading="Verification Code"
      formSubheading={subheading}
      formElement={<ResetPasswordOTPComponent />}
    />
  );
};

export default ResetPasswordOTP;
