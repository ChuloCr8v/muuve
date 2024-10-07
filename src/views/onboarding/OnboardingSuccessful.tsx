import { Button } from "antd";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import BoxIcon from "/box-icon.png";

const OnboardingSuccessful = () => {
  const { email } = useParams();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center gap-4">
      <img src={BoxIcon} alt="Successful" />
      <h2 className="font-semibold text-2xl">Check your inbox to log in</h2>

      <p className="text-grey max-w-[400px]">
        A link has been sent to your email
        <span className="font-semibold text-black"> {email}</span>. Click on the
        link to complete setup and log in.
      </p>

      <Button
        type="link"
        className="p-0 border-none shadow-none bg-transparent text-primary underline underline-offset-4 "
      >
        Resend Verification Link
      </Button>

      <Footer />
    </div>
  );
};

export default OnboardingSuccessful;
