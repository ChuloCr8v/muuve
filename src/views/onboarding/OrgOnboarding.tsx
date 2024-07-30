import { Button, Checkbox, Form, Input } from "antd";
import CustomLabel from "../../component/CustomLabel";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrgOnboarding = () => {
  return (
    <div className="">
      <OnboardingLayout
        backButton={false}
        children={<Children />}
        heading={"Welcome! Get Started"}
        subheading={"Fill in the information below to proceed"}
      />
    </div>
  );
};

export default OrgOnboarding;

const Children = () => {
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);

  const navigate = useNavigate();

  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidator = () => {
    if (!email || emailRegex.test(email)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter a valid email address!"));
  };

  const handleSubmit = () => {
    navigate(`/org/onboarding/verify-otp/${email}`);
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" className="w-[480px]">
      <Form.Item
        name="work email"
        label={<CustomLabel label={"Work Email"} required />}
        colon={false}
        rules={[{ required: true }, { validator: emailValidator }]}
      >
        <Input
          placeholder="sample@company.com"
          className=""
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="-mt-4">
        <Checkbox
          checked={agreement}
          onChange={() => setAgreement(!agreement)}
        />
        <span className="ml-2 text-customBlack text-sm">
          I agree to the{" "}
          <a href="" className="font-semibold underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="" className="font-semibold underline">
            Privacy Policy
          </a>
        </span>
      </Form.Item>
      <Form.Item>
        <Button
          disabled={email === "" || !agreement}
          type="primary"
          htmlType="submit"
          className="w-full h-10"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
