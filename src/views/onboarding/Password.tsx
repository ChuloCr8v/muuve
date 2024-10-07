import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import PasswordComponent from "../../components/onboarding/PasswordComponent";

const Password = () => {
  return (
    <OnboardingLayout
      children={<PasswordComponent />}
      heading={"Set up Password"}
      subheading={"Choose a password to proceed"}
      steps
      currentStep={2}
      totalSteps={5}
    />
  );
};

export default Password;
