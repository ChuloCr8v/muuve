import { ReactNode } from "react";
import WaterMark from "../../../public/miro-bg.png";
import Footer from "../../views/onboarding/Footer";
import FormLogoHeading from "../../views/onboarding/FormLogoHeading";
import FormHeading from "../onboarding/FormHeading";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Props = {
  formElement: ReactNode;
  formHeading?: string;
  formSubheading?: ReactNode;
  showBackBtn?: boolean;
  backURL?: string;
};

const AuthLayout = ({
  formElement,
  formHeading,
  formSubheading,
  showBackBtn,
  backURL,
}: Props) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (backURL) {
      navigate(backURL);
      return;
    }
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative">
      <div className="max-w-[450px] h-full w-full flex flex-col items-center justify-center space-y-24">
        {showBackBtn && (
          <Button
            onClick={goBack}
            className="text-grey place-self-start -mt-24 p-0 border-none"
          >
            <ArrowLeftOutlined />
            Back
          </Button>
        )}
        <div className="space-y-6 p-8 shadow-logincard rounded-lg bg-white w-full">
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
      </div>

      <img
        src={WaterMark}
        alt="miro service management"
        className="absolute left-0 bottom-28 max-w-[450px] w-full -z-10"
      />
      <Footer />
    </div>
  );
};

export default AuthLayout;
