import { useGetAuthUserQuery } from "@/api/auth.api";
import { Button, Form, Input, Select, Tag } from "antd";
import { E164Number } from "libphonenumber-js";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { twMerge } from "tailwind-merge";
import Heading from "../../components/global/Header";
import TableRowData from "../../components/global/TableRowData";
import CustomLabel from "../../components/onboarding/CustomLabel";
import {
  OrganizationInformationType,
  orgInfo,
} from "../../dummy/organizationInfo";
import AccountLayout from "./AccountLayout";

const ProfileSetting = () => {
  const [companyFormData, setCompanyFormData] =
    useState<OrganizationInformationType>(orgInfo);

  useEffect(() => {
    setCompanyFormData(orgInfo);
  }, []);

  const handleChange = (name: string, value: string | E164Number) => {
    setCompanyFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { data } = useGetAuthUserQuery();

  return (
    <AccountLayout>
      <div className="bg-white border rounded-md p-4 w-full space-y-4">
        <Heading heading="Profile Settings" />

        <div className="profile-tag flex items-center gap-2">
          <div className="profile-picture h-[64px] w-[64px] overflow-hidden">
            <img
              src={companyFormData.companyLogo}
              alt="organization logo"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-2xl text-customBlack"> {data?.staff.name}</p>
          <Tag color="green" className="rounded-full text-grey">
            Tracking ID:{" "}
            <span className="font-semibold">{data?.staff.orgId}</span>
          </Tag>
        </div>

        <div className="profile-body">
          <Form layout="vertical" className="">
            <ProfileSectionCard
              label={"Company Logo"}
              subtitle={"Your logo will be displayed on your profile"}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-20 border rounded overflow-hidden">
                  <img
                    src={companyFormData?.companyLogo}
                    alt="current profile image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative">
                  <Button>Upload Picture</Button>
                  <input
                    type="file"
                    className="absolute left-0 top-0 w-full opacity-0  f"
                  />
                </div>
              </div>
            </ProfileSectionCard>

            <ProfileSectionCard
              label={"Company Information"}
              subtitle={"Your company's basic information."}
            >
              <Form.Item
                label={<CustomLabel label="Company Name" />}
                className="col-span-2"
              >
                <Input
                  type="text"
                  name="companyName"
                  value={data?.staff.name}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>

              <Form.Item label={<CustomLabel label="Email Address" />}>
                <Input
                  type="email"
                  name="emailAddress"
                  value={data?.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>
              <Form.Item label={<CustomLabel label="Phone Number" />}>
                <Input
                  className="h-7 w-full p-2 rounded-md border focus:border-primary hover:border-primary"
                  value={companyFormData?.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </Form.Item>
              <Form.Item label={<CustomLabel label="Industry" />}>
                <Select
                  options={[
                    { label: "Telecommunication", value: "telecommunication" },
                    { label: "Cyber Security", value: "cyberSecurity" },
                  ]}
                />
              </Form.Item>
            </ProfileSectionCard>

            <ProfileSectionCard
              label={"Website URL"}
              subtitle={"Your company's website link."}
            >
              <Form.Item className="col-span-2">
                <Input
                  prefix="www."
                  type="text"
                  name="website"
                  value={companyFormData?.website}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>
            </ProfileSectionCard>

            <ProfileSectionCard
              label={"Bank Details"}
              subtitle={"Your company's Bank Information."}
            >
              <Form.Item
                label={<CustomLabel label="Bank Name" />}
                className="col-span-2"
              >
                <Input
                  type="text"
                  name="bankName"
                  value={companyFormData?.bankName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>
              <Form.Item label={<CustomLabel label="Account Name" />}>
                <Input
                  type="text"
                  name="accountName"
                  value={companyFormData?.accountName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>
              <Form.Item label={<CustomLabel label="Account Name" />}>
                <Input
                  type="text"
                  name="accountNumber"
                  value={companyFormData?.accountNumber}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>
            </ProfileSectionCard>

            <ProfileSectionCard
              label={"Social Profiles"}
              subtitle={"Your company's Social Media Handles."}
            >
              <Form.Item className="col-span-2">
                <Input
                  prefix="facebook.com/"
                  type="text"
                  name="facebook"
                  value={companyFormData?.facebook}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>

              <Form.Item className="col-span-2">
                <Input
                  prefix="twitter.com/"
                  type="text"
                  name="twitter"
                  value={companyFormData?.twitter}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>

              <Form.Item className="col-span-2">
                <Input
                  prefix="linked.com/"
                  type="text"
                  name="linkedin"
                  value={companyFormData?.linkedIn}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>
            </ProfileSectionCard>

            <ProfileSectionCard
              label={"Support Information"}
              subtitle={"Your company's support contact."}
            >
              <Form.Item
                label={<CustomLabel label="Full Name" />}
                className="col-span-2"
              >
                <Input
                  type="text"
                  name="supportFullName"
                  value={companyFormData?.supportFullName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>

              <Form.Item label={<CustomLabel label="Email Address" />}>
                <Input
                  type="text"
                  name="supportEmail"
                  value={companyFormData?.supportEmail}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Form.Item>

              <Form.Item label={<CustomLabel label="Phone Number" />}>
                <PhoneInput
                  country="US"
                  withCountryCallingCode
                  className="h-7 w-full p-2 rounded-md border focus:border-primary hover:border-primary"
                  value={companyFormData?.supportPhone}
                  onChange={(value) =>
                    handleChange("phoneNumber", value as E164Number)
                  }
                />
              </Form.Item>
            </ProfileSectionCard>
          </Form>
        </div>
      </div>
    </AccountLayout>
  );
};

export default ProfileSetting;

const ProfileSectionCard = (props: any) => {
  return (
    <div
      className={twMerge("flex items-center border-b py-4 ", props.className)}
    >
      <TableRowData
        mainText={props.label}
        tagText={props.subtitle}
        wrapperClassName="max-w-[320px] w-full"
      />
      <div className="w-full grid grid-cols-2 gap-x-2">{props.children}</div>
    </div>
  );
};
