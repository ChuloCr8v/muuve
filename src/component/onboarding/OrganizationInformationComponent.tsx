import { Form, Input, Select, Button } from "antd";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { diallingCodes } from "../../dummy/diallingCodes";
import CustomLabel from "./CustomLabel";
import { industries } from "../../dummy/industries";

const infoDataProps = {
  companyName: "",
  industry: "",
  phoneNumber: "",
};

const OrganizationInformationComponent = () => {
  const [infoData, setInfoData] = useState(infoDataProps);
  const [callingCode, setCallingCode] = useState("");

  const { email } = useParams();

  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setInfoData((prev) => ({ ...prev, [name]: value }));
    console.log(infoData);
  };

  //verify all form data is complete
  const isFormDataComplete = () => {
    return Object.values(infoData).some((value) => value === "");
  };

  //search through dialling codes
  const filterOption = (input: any, option: any) =>
    option.label.toLowerCase().includes(input.toLowerCase());

  const handleSubmit = () => {
    navigate(`/org/onboarding/password/${email}`);
  };

  return (
    <Form
      layout="vertical"
      className="organization-onboarding-form w-[480px]"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="company name"
        label={<CustomLabel label={"Company Name"} required />}
        colon={false}
      >
        <Input
          onChange={(e) => handleChange("companyName", e.target.value)}
          className=""
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="industry"
        label={<CustomLabel label={"Industry"} required />}
        colon={false}
      >
        <Select
          className=""
          options={industries.map((industry) => ({
            label: industry.label,
            value: industry.value,
          }))}
          onChange={(value) => handleChange("industry", value)}
        />
      </Form.Item>
      <Form.Item
        className=""
        label={<CustomLabel label={"Phone Number"} required />}
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
            onChange={(value) => setCallingCode(value)}
          />
          <Input
            type="number"
            onChange={(e) =>
              handleChange("phoneNumber", callingCode + e.target.value)
            }
            required
          />
        </div>
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

export default OrganizationInformationComponent;
