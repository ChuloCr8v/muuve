import AuthLayout from "../../components/auth/AuthLayout";
import LoginComponent from "../../components/auth/LoginComponent";

export default function Login() {
  return <AuthLayout formElement={<LoginComponent />} />;
}
