import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import PasswordComponent from "../../component/onboarding/PasswordComponent";

const Password = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/org/onboarding/products");
  };

  return (
    <OnboardingLayout
      children={<PasswordComponent handleSubmit={handleSubmit} />}
      heading={"Set up Password"}
      subheading={"Choose a password to proceed"}
      steps
      currentStep={2}
      totalSteps={5}
    />
  );
};

export default Password;
