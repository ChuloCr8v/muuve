import { useLocation } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import VerificationComponent from "../../components/onboarding/VerificationComponent";

const VerifyOrgOTP = () => {
  const location = useLocation();
  const email = location.state.email;

  return (
    <OnboardingLayout
      children={<VerificationComponent email={email} />}
      heading={"Verification Code"}
      subheading={
        <span>
          Enter the 6-digit code that was sent to <b>{email}</b>
        </span>
      }
    />
  );
};

export default VerifyOrgOTP;
