import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrgVerMailMutation } from "../../api/auth.api";
import { OrgVerInput } from "../../api/types";
import { toastApiError } from "../../utils/error.util";
import { useAuthState } from "../../api/data/auth";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import CustomLabel from "../../components/onboarding/CustomLabel";

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
  const [form] = useForm();
  const auth = useAuthState();

  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);

  const navigate = useNavigate();

  const [orgVerMail, { isLoading }] = useOrgVerMailMutation();

  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidator = () => {
    if (!email || emailRegex.test(email)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter a valid email address!"));
  };

  const handleSubmit = (values: OrgVerInput) => {
    orgVerMail(values)
      .unwrap()
      .then((res) => {
        navigate(`/org/verify-otp`, {
          state: { email: values.email },
        });
        auth.set(res);
      })
      .catch(toastApiError);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="w-[480px]"
    >
      <Form.Item
        name="email"
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
      <Form.Item className="-mt-2">
        <Checkbox
          checked={agreement}
          onChange={() => setAgreement(!agreement)}
        />
        <span className="ml-2 text-sm text-customBlack">
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
          loading={isLoading}
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
