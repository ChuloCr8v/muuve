import { Button, Drawer, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { twMerge } from "tailwind-merge";
import MultiUpload from "../../Global/MultipleUpload";
import ProjectDetailsDrawerHeading from "../../Global/ProjectDetailsDrawerHeading";
import CustomLabel from "../../onboarding/CustomLabel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { jobData } from "../../data/JobData";
import { JobOrderType } from "../../../types";

type Props = {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  editJobOrder: { isOpen: boolean; jobOrderId: string | undefined };
  setEditJobOrder: Dispatch<
    SetStateAction<{ isOpen: boolean; jobOrderId: string | undefined }>
  >;
};

const NewJobOrderForm = ({
  open,
  setOpen,
  setEditJobOrder,
  editJobOrder,
}: Props) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState<JobOrderType>();

  useEffect(() => {
    const currentJobOrder = jobData.find(
      (job) => job.id === editJobOrder.jobOrderId
    );
    setFormData(currentJobOrder);
  }, [editJobOrder.jobOrderId]);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedJobData = jobData.map((job) =>
      job.id === editJobOrder.jobOrderId ? { ...job, ...formData } : job
    );

    console.log(updatedJobData);
  };

  const formOptions = [
    {
      label: "Project Type",
      value: formData?.projectType,
      name: "projectType",
      type: "select",
      options: [
        { label: "Type A", value: "typeA" },
        { label: "Type B", value: "typeB" },
        { label: "Type C", value: "typeC" },
      ],
    },
    {
      label: "service description",
      value: formData?.serviceDescription,
      name: "serviceDescription",
      type: "textarea",
    },
    {
      label: "service location address",
      value: formData?.serviceAddress,
      name: "serviceAddress",
      type: "input",
    },
    {
      label: "service type",
      value: formData?.serviceType,
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
      value: formData?.requestType,
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
      value: formData?.modeOfDelivery,
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
      value: formData?.projectCategory,
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
      value: formData?.bandwidth,
      name: "bandwidth",
      type: "input",
    },
    {
      label: "NRR",
      value: formData?.nrr,
      name: "nrr",
      type: "input",
    },
    {
      label: "MRR",
      value: formData?.mrr,
      name: "mrr",
      type: "input",
    },
    {
      label: "state",
      value: formData?.state,
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
      value: formData?.region,
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
      value: formData?.longitude,
      name: "longitude",
      type: "input",
    },
    {
      label: "latitude",
      value: formData?.latitude,
      name: "latitude",
      type: "input",
    },
    {
      label: "design manager",
      value: formData?.designManager,
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
      value: formData?.projectLead,
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
      value: formData?.accountPartner,
      name: "accountPartner",
      type: "input",
    },
    {
      label: "customer name",
      value: formData?.customerName,
      name: "customerName",
      type: "input",
    },
    {
      label: "customer phone number",
      value: formData?.customerPhone,
      name: "customerPhone",
      type: "input",
    },
    {
      label: "customer email",
      value: formData?.customerEmail,
      name: "customerEmail",
      type: "input",
    },
    {
      label: "comment",
      value: formData?.comment,
      name: "comment",
      type: "textarea",
    },
  ];

  return (
    <Drawer
      width={600}
      closeIcon={false}
      closable
      open={open}
      onClose={() => {
        setOpen(false);
        setEditJobOrder({ isOpen: false, jobOrderId: "" });
      }}
      title={<ProjectDetailsDrawerHeading title="New Custom Job Order" />}
    >
      <Form
        layout="vertical"
        className="grid grid-cols-4 gap-x-3 new-job-order"
      >
        {formOptions.map((option) => (
          <Form.Item
            className={twMerge(
              [
                "project type",
                "customer name",
                "service description",
                "service location address",
                "comment",
              ].includes(option.label.toLowerCase())
                ? "col-span-4"
                : "col-span-2",
              ["nrr", "mrr"].includes(option.label.toLowerCase()) &&
                "col-span-1"
            )}
            label={<CustomLabel label={option.label} required />}
          >
            {option.type === "input" ? (
              <Input
                size="small"
                value={option.value}
                name={option.name}
                type={
                  ["latitude", "longitude", "mrr", "nrr"].includes(
                    option.label.toLowerCase()
                  )
                    ? "number"
                    : "text"
                }
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            ) : option.type === "select" ? (
              <Select
                size="small"
                value={option.value}
                onChange={(value) => handleChange(option.name, value)}
                options={option.options?.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            ) : (
              <TextArea
                size="small"
                value={option.value}
                onChange={(e) => handleChange(option.name, e.target.value)}
              />
            )}
          </Form.Item>
        ))}

        <Form.Item
          className="w-full mt-3 col-span-4"
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

      <div className="w-full flex items-center justify-end gap-4 mt-4 pt-6 border-t">
        <Button
          className="w-[100px]"
          onClick={() => {
            setEditJobOrder({ isOpen: false, jobOrderId: "" });
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" className="w-[144px]" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Drawer>
  );
};

export default NewJobOrderForm;
