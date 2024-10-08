import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ReactNode } from "react";
import MiroBg from "/miro-bg.png";
import Footer from "../../views/onboarding/Footer";
import FormHeading from "./FormHeading";
import FormLogoHeading from "../../views/onboarding/FormLogoHeading";

type Props = {
  children: ReactNode;
  heading: string;
  subheading: ReactNode;
  backButton?: boolean;
  currentStep?: number;
  totalSteps?: number;
  steps?: boolean;
};

const OnboardingLayout = (props: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-4 py-24">
      <div className="grid gap-6">
        {props.backButton !== false && (
          <Button
            onClick={() => window.history.back()}
            type="link"
            className="flex items-center justify-start p-0 text-base text-grey w-fit"
            icon={<LeftOutlined className="text-xs" />}
          >
            Back
          </Button>
        )}

        <FormLogoHeading />
        <FormHeading
          heading={props.heading}
          subheading={props.subheading}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
          steps={props.steps}
        />
        {props.children}
      </div>
      <img
        src={MiroBg}
        alt="Miro Service Management"
        className="max-w-[444px] absolute left-0 bottom-20 -z-10"
      />

      <Footer />
    </div>
  );
};

export default OnboardingLayout;
