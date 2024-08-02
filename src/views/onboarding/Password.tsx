import { Button, Form, Input } from "antd";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import CustomLabel from "../../component/onboarding/CustomLabel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Password = (props: Props) => {
  return (
    <OnboardingLayout
      children={<Children />}
      heading={"Set up Password"}
      subheading={"Choose a password to proceed"}
      steps
      currentStep={2}
      totalSteps={5}
    />
  );
};

export default Password;

const Children = () => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    console.log(passwordData);
  };

  //Validate that required info is provided
  const isFormDataComplete = () => {
    const passwordFields = Object.values(passwordData).some(
      (item) => item === ""
    );

    if (
      passwordFields ||
      passwordData.confirmPassword !== passwordData.password
    )
      return true;
  };

  const handleSubmit = () => {
    navigate("/org/onboarding/products");
  };

  return (
    <Form className="w-[480px]" layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={<CustomLabel label={"Password"} required />}>
        <Input.Password
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </Form.Item>
      <Form.Item label={<CustomLabel label={"Comfirm Password"} required />}>
        <Input.Password
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </Form.Item>
      <Button
        className="w-full"
        type="primary"
        htmlType="submit"
        disabled={isFormDataComplete()}
      >
        Proceed
      </Button>
    </Form>
  );
};
