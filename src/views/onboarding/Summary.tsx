import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import SummaryComponent from "../../component/onboarding/SummaryComponent";

const Summary = () => {
  return (
    <div className="font-[Inter]">
      <OnboardingLayout
        steps
        currentStep={5}
        totalSteps={5}
        heading="Summary"
        subheading="Review details before proceeding to payment "
        children={<SummaryComponent />}
      />
    </div>
  );
};

export default Summary;
