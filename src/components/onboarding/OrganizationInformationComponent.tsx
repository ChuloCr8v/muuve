import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { diallingCodes } from "../../dummy/diallingCodes";
import { industries } from "../../dummy/industries";
import CustomLabel from "./CustomLabel";

const OrganizationInformationComponent = () => {
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [callingCode, setCallingCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  //search through dialling codes
  const filterOption = (input: any, option: any) =>
    option.label.toLowerCase().includes(input.toLowerCase());

  // Handle form submission
  const handleSubmit = async () => {
    const values = await form.validateFields();
    sessionStorage.setItem("onboard", JSON.stringify(values));
    navigate(`/org/onboarding/password`);
  };

  // Combine the phone number and dialing code when either changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setPhoneNumber(number);
    const fullPhoneNumber = callingCode + number; // Combine dialing code with phone number
    form.setFieldsValue({
      phone: fullPhoneNumber,
    });
  };

  const handleDialCodeChange = (value: string) => {
    setCallingCode(value);
    const fullPhoneNumber = value + phoneNumber; // Combine dialing code with phone number
    form.setFieldsValue({
      phone: fullPhoneNumber,
    });
  };

  // Monitor form values and check if all fields are filled
  const handleFormChange = (_changedValues: any, allValues: any) => {
    const isComplete = Object.values(allValues).every((value) => value);
    setIsButtonDisabled(!isComplete);
  };

  useEffect(() => {
    const onboardData = sessionStorage.getItem("onboard");

    if (onboardData) {
      const data = JSON.parse(onboardData);
      form.setFieldsValue({
        name: data.name,
        orgName: data.orgName,
        industry: data.industry,
        phone: data.phone,
      });
    }
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      className="organization-onboarding-form w-[480px]"
      onFinish={handleSubmit}
      onValuesChange={handleFormChange} // Monitor value changes
    >
      <Form.Item
        name="name"
        label={<CustomLabel label={"Name"} required />}
        colon={false}
        rules={[{ required: true, message: "Please input your name" }]}
      >
        <Input className="" type="text" />
      </Form.Item>

      <Form.Item
        name="orgName"
        label={<CustomLabel label={"Company Name"} required />}
        colon={false}
        rules={[{ required: true, message: "Please input your company name" }]}
      >
        <Input className="" type="text" />
      </Form.Item>

      <Form.Item
        name="industry"
        label={<CustomLabel label={"Industry"} required />}
        colon={false}
        rules={[{ required: true, message: "Please select an industry" }]}
      >
        <Select
          className=""
          options={industries.map((industry) => ({
            label: industry.label,
            value: industry.value,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label={<CustomLabel label={"Phone Number"} required />}
        rules={[{ required: true, message: "Please input your phone number" }]}
      >
        <div className="flex items-center gap-2">
          <Select
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
            options={diallingCodes.map((item) => ({
              label: `${item.code} ${item.name}`,
              value: item.code,
            }))}
            dropdownStyle={{ width: 150 }}
            style={{ width: "fit-content" }}
            placeholder="+234"
            onChange={handleDialCodeChange} // Set dialing code
          />
          <Input
            type="number"
            onChange={handlePhoneChange} // Set phone number
            required
          />
        </div>
      </Form.Item>

      <Button
        className="w-full"
        type="primary"
        htmlType="submit"
        disabled={isButtonDisabled}
      >
        Proceed
      </Button>
    </Form>
  );
};

export default OrganizationInformationComponent;
