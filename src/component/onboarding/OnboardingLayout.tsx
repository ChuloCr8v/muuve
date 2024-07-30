import { ReactNode } from "react";
import MiroLogo from "../../../public/miro-color.png";
import MiroBg from "../../../public/miro-bg.png";
import Footer from "../../views/onboarding/Footer";
import FormHeading from "./FormHeading";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

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
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen relative">
      {props.backButton !== false && (
        <Button
          onClick={() => window.history.back()}
          type="link"
          className="text-grey text-base flex items-center justify-center absolute top-20 left-20"
          icon={<LeftOutlined className="text-xs" />}
        >
          Back
        </Button>
      )}
      <img
        src={MiroLogo}
        alt="Miro Service Management"
        className="max-w-[86px]"
      />
      <div className="grid gap-6 ">
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
