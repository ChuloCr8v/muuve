import { Drawer, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { twMerge } from "tailwind-merge";
import MultiUpload from "../../Global/MultipleUpload";
import ProjectDetailsDrawerHeading from "../../Global/ProjectDetailsDrawerHeading";
import CustomLabel from "../../onboarding/CustomLabel";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (arg0: boolean) => void;
};

const NewJobOrderForm = ({ open, setOpen }: Props) => {
  const [files, setFiles] = useState([]);

  const formOptions = [
    {
      label: "customer name",
      value: "",
      name: "customerName",
      type: "input",
    },
    {
      label: "service description",
      value: "",
      name: "serviceDescription",
      type: "textarea",
    },
    {
      label: "service location address",
      value: "",
      name: "serviceLocationAddress",
      type: "input",
    },
    {
      label: "service type",
      value: "",
      name: "serviceType",
      type: "select",
      options: [
        { label: "Type A", value: "typeA" },
        { label: "Type B", value: "typeB" },
        { label: "Type C", value: "typeC" },
      ],
    },
    {
      label: "request type",
      value: "",
      name: "requestType",
      type: "select",
      options: [
        { label: "Type A", value: "typeA" },
        { label: "Type B", value: "typeB" },
        { label: "Type C", value: "typeC" },
      ],
    },
    {
      label: "mode of delivery",
      value: "",
      name: "modeOfDelivery",
      type: "select",
      options: [
        { label: "Mode A", value: "modeA" },
        { label: "Mode B", value: "modeB" },
        { label: "Mode C", value: "modeC" },
      ],
    },
    {
      label: "project category",
      value: "",
      name: "projectCategory",
      type: "select",
      options: [
        { label: "Category A", value: "categoryA" },
        { label: "Category B", value: "categoryB" },
        { label: "Category C", value: "categoryC" },
      ],
    },
    {
      label: "bandwidth",
      value: "",
      name: "bandwidth",
      type: "input",
    },
    {
      label: "NRR",
      value: "",
      name: "nrr",
      type: "input",
    },
    {
      label: "MRR",
      value: "",
      name: "mrr",
      type: "input",
    },
    {
      label: "state",
      value: "",
      name: "state",
      type: "select",
      options: [
        { label: "State A", value: "stateA" },
        { label: "State B", value: "stateB" },
        { label: "State C", value: "stateC" },
      ],
    },
    {
      label: "region",
      value: "",
      name: "region",
      type: "select",
      options: [
        { label: "Region A", value: "regionA" },
        { label: "Region B", value: "regionB" },
        { label: "Region C", value: "regionC" },
      ],
    },
    {
      label: "longitude",
      value: "",
      name: "longitude",
      type: "input",
    },
    {
      label: "latitude",
      value: "",
      name: "latitude",
      type: "input",
    },
    {
      label: "design manager",
      value: "",
      name: "designManager",
      type: "select",
      options: [
        { label: "Manager A", value: "managerA" },
        { label: "Manager B", value: "managerB" },
        { label: "Manager C", value: "managerC" },
      ],
    },
    {
      label: "project lead",
      value: "",
      name: "projectLead",
      type: "select",
      options: [
        { label: "Lead A", value: "leadA" },
        { label: "Lead B", value: "leadB" },
        { label: "Lead C", value: "leadC" },
      ],
    },
    {
      label: "account partner",
      value: "",
      name: "accountPartner",
      type: "input",
    },
    {
      label: "customer name",
      value: "",
      name: "customerName2",
      type: "input",
    },
    {
      label: "customer phone number",
      value: "",
      name: "customerPhoneNumber",
      type: "input",
    },
    {
      label: "customer email",
      value: "",
      name: "customerEmail",
      type: "input",
    },
    {
      label: "comment",
      value: "",
      name: "comment",
      type: "textarea",
    },
  ];

  return (
    <Drawer
      width={500}
      closeIcon={false}
      closable
      open={open}
      onClose={() => setOpen(false)}
      title={<ProjectDetailsDrawerHeading title="New Custom Job Order" />}
    >
      <Form
        layout="vertical"
        className="grid grid-cols-2 gap-x-3 new-job-order"
      >
        {formOptions.map((option) => (
          <Form.Item
            className={twMerge(
              "",
              option.label.toLowerCase() === "customer name" && "col-span-2",
              option.label.toLowerCase() === "service description" &&
                "col-span-2",
              option.label.toLowerCase() === "service location address" &&
                "col-span-2",
              option.label.toLowerCase() === "comment" && "col-span-2"
            )}
            label={<CustomLabel label={option.label} required />}
          >
            {option.type === "input" ? (
              <Input size="small" />
            ) : option.type === "select" ? (
              <Select
                size="small"
                options={option.options?.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            ) : (
              <TextArea size="small" />
            )}
          </Form.Item>
        ))}
        <Form.Item
          className="w-full mt-3 col-span-2"
          label={
            <CustomLabel
              label="Upload one or more files"
              extra="(Max: 10 files, 10mb each)"
            />
          }
        >
          <MultiUpload className="w-full" files={files} setFiles={setFiles} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewJobOrderForm;
