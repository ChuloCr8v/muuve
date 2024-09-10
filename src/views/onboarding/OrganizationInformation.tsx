import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import OrganizationInformationComponent from "../../component/onboarding/OrganizationInformationComponent";

const OrganizationInformation = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <OnboardingLayout
        children={<OrganizationInformationComponent />}
        heading={"Organization Information"}
        subheading={"Fill in the information below to continue"}
        steps
        currentStep={1}
        totalSteps={5}
      />
    </div>
  );
};

export default OrganizationInformation;
