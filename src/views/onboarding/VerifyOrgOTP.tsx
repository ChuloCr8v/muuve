import { useParams } from "react-router-dom";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import VerificationComponent from "../../component/onboarding/VerificationComponent";

const VerifyOrgOTP = () => {
  const { email } = useParams();

  return (
    <OnboardingLayout
      children={<VerificationComponent />}
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
