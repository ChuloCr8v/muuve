import AuthLayout from "../../component/auth/AuthLayout";
import LoginComponent from "../../component/auth/LoginComponent";

export default function Login() {
  return <AuthLayout formElement={<LoginComponent />} />;
}
