import AuthLayout from "../../components/auth/AuthLayout";
import ForgotPasswordComponent from "../../components/auth/ForgotPasswordComponent";

const ForgotPassword = () => {
  return (
    <AuthLayout
      showBackBtn={true}
      backURL="/login"
      formElement={<ForgotPasswordComponent />}
      formHeading="Reset Password"
      formSubheading="Enter your email to reset your password"
    />
  );
};

export default ForgotPassword;
