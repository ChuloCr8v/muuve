import { CheckCircleOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../views/onboarding/Footer";
import MiroBg from "../../../public/miro-bg.png";

const SuccessfulPasswordReset = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const returnToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2 relative">
      <div className="bg-green-100 h-40 w-40 p-4 rounded-full flex items-center justify-center">
        <CheckCircleOutlined className="text-[100px] text-green-300" />
      </div>

      <h2 className="text-customBlack font-bold text-2xl mt-4">
        Password Reset Successful
      </h2>
      <p className="text-grey">
        Password has been successfully reset for <b> {email}</b>
      </p>
      <p className="text-grey">
        Go back to{" "}
        <Link to="/login" className="underline underline-offset-2 text-primary">
          Login Page{" "}
        </Link>
      </p>

      <div className="flex flex-col items-center">
        <span className="text-grey mt-4 block text-center">
          Returning to login page in{" "}
        </span>{" "}
        <Countdown
          className="text-primary"
          date={Date.now() + 5000}
          onComplete={returnToLogin}
        />
      </div>
      <Footer />

      <img
        src={MiroBg}
        alt="Miro Service Management"
        className="max-w-[444px] absolute left-0 bottom-40 -z-10"
      />
    </div>
  );
};

export default SuccessfulPasswordReset;
