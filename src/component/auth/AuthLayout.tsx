import { ReactNode } from "react";
import WaterMark from "../../../public/miro-bg.png";
import Footer from "../../views/onboarding/Footer";
import FormLogoHeading from "../../views/onboarding/FormLogoHeading";
import FormHeading from "../onboarding/FormHeading";

type Props = {
  formElement: ReactNode;
  formHeading?: string;
  formSubheading?: ReactNode;
};

const AuthLayout = ({ formElement, formHeading, formSubheading }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative">
      <div className="space-y-6 p-8 shadow-logincard rounded-lg bg-white max-w-[450px] w-full">
        <FormLogoHeading />
        <div className="text-center">
          <FormHeading
            heading={formHeading}
            subheading={
              <span className="text-grey mt-2 block">{formSubheading}</span>
            }
          />
        </div>

        {formElement}
      </div>
      <img
        src={WaterMark}
        alt="miro service management"
        className="absolute left-0 max-w-[500px] w-full -z-10"
      />
      <Footer />
    </div>
  );
};

export default AuthLayout;
