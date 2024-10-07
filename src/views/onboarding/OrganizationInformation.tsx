import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OrganizationInformationComponent from "../../components/onboarding/OrganizationInformationComponent";

const OrganizationInformation = () => {
  return (
    <div className="flex flex-col w-full gap-6">
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
