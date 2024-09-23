import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../../component/auth/AuthLayout";
import PasswordComponent from "../../component/onboarding/PasswordComponent";

const ResetPassword = () => {
  const { email } = useParams();

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/auth/successful-password-reset/${email}`);
  };

  const subheading = (
    <p className="">
      Enter new password for <b>{email}</b>
    </p>
  );

  return (
    <AuthLayout
      formElement={<PasswordComponent handleSubmit={handleSubmit} />}
      formHeading="Reset Password"
      formSubheading={subheading}
    />
  );
};

export default ResetPassword;
