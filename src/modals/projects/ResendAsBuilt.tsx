import { useSubmitAsBuiltMutation } from "@/api/project.api";
import { Alert, Button, Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useState } from "react";

interface Props {
  project: Project;
}

const fields = {
  txMedium: "TX Medium",
  frequency: "Frequency",
  terminalEquipmentType: "Terminal equipment type",
  upeCtnInterface: "UPE/CTN interface",
  loopbackIp: "Loopback IP",
  wanIp: "WAN IP",
  lanIp: "LAN IP",
  serviceVlan: "Service VLAN",
  connectingSiteId: "Connecting Site ID",
  connectingSiteName: "Connecting Site Name",
  customerId: "Customer X-No",
  latitude: "Latitude",
  longitude: "Longitude",
};

type FieldKey = keyof typeof fields;

const fieldKeys = Object.keys(fields) as FieldKey[];

export const JobResendAsBuiltModal = ({ project }: Props) => {
  const [different, setDifferent] = useState<FieldKey[]>([]);
  const isDifferent = different.length > 0;

  const { design } = project;
  const { comment, attachments, ...rest } = project.asBuilt;

  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [submitAsBuilt, { isLoading }] = useSubmitAsBuiltMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    submitAsBuilt(data)
      .unwrap()
      .then(() => {
        message.success("As-Built Submitted");
        closeModal();
      })
      .catch(toastApiError);
  };

  function prefillWithDesign() {
    if (design) {
      setDifferent([]);
      const { attachments, comment, ...rest } = design;
      form.setFieldsValue(rest);
    }
  }

  const onUpdate = () => {
    if (!design) {
      setDifferent([]);
      return;
    }
    const diffNames: FieldKey[] = [];
    for (const key of fieldKeys) {
      const value = form.getFieldValue(key);
      if (value && value !== design?.[key]) {
        diffNames.push(key);
      }
    }
    setDifferent(diffNames);
  };

  return (
    <CustomModal
      title="Resend As-Built"
      okText={isDifferent ? "Request Approval" : "Submit"}
      onSubmit={submit}
      loading={isLoading}
      width={950}
      center
    >
      <div className="w-full">
        <Form form={form} layout="vertical" initialValues={rest}>
          {project.design && (
            <div className="flex justify-end mb-4">
              <Button type="primary" size="small" onClick={prefillWithDesign}>
                Use Values From Design
              </Button>
            </div>
          )}
          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              label="Tx Medium"
              name="txMedium"
              rules={[{ required: true, message: "Tx Medium is required" }]}
            >
              <Select
                size="small"
                options={[
                  { label: "Fibre", value: "Fibre" },
                  { label: "LTE", value: "LTE" },
                  { label: "PMP", value: "PMP" },
                  { label: "POP", value: "POP" },
                  { label: "PTP", value: "PTP" },
                ]}
                onChange={onUpdate}
              />
            </Form.Item>
            <Form.Item
              label="Frequency"
              name="frequency"
              rules={[{ required: true, message: "Frequncy is required" }]}
            >
              <Select
                size="small"
                options={[
                  { label: "5.4MHz", value: "5.4MHz" },
                  { label: "5.8MHz", value: "5.8MHz" },
                  { label: "800MHz", value: "800MHz" },
                  { label: "3.5GHz", value: "3.5GHz" },
                  { label: "10GHz", value: "10GHz" },
                  { label: "18GHz", value: "18GHz" },
                ]}
                onChange={onUpdate}
              />
            </Form.Item>
            <Form.Item
              label="Terminal equipment type"
              name="terminalEquipmentType"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
            <Form.Item
              label="Service VLAN"
              name="serviceVlan"
              rules={[{ required: true, message: "Service Vlan is required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item label="Customer ID" name="customerId">
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
            <Form.Item
              label="Loopback IP"
              name="loopbackIp"
              rules={[{ required: true, message: "Loopback Ip is required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
            <Form.Item
              label="WAN-IP"
              name="wanIp"
              rules={[{ required: true, message: "WAN-IP is Required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
            <Form.Item
              label="LAN-IP"
              name="lanIp"
              rules={[{ required: true, message: "LAN-IP is Required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              label="UPE/CTN interface"
              name="upeCtnInterface"
              rules={[{ required: true }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
            <Form.Item
              label="Access Port Node"
              name="accessPortNode"
              rules={[{ required: true }]}
            >
              <Input size="small" required />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber
                size="small"
                className="w-full"
                onChange={onUpdate}
              />
            </Form.Item>
            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber
                size="small"
                className="w-full"
                onChange={onUpdate}
              />
            </Form.Item>
            <Form.Item
              label="Connecting Site ID"
              name="connectingSiteId"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>

            <Form.Item
              label="Connecting Site Name"
              name="connectingSiteName"
              rules={[{ required: true, message: "LAN-IP is Required" }]}
            >
              <Input size="small" onChange={onUpdate} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item label="LGA" name="lga" rules={[{ required: true }]}>
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="Service Provider"
              name="serviceProvider"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="CPE Type"
              name="cpeType"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="CE Device"
              name="ceDevice"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              label="Radio Version"
              name="radioVersion"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="Antenna"
              name="antenna"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="Indoor"
              name="indoor"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="Polarization"
              name="polarization"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              label="Device OEM"
              name="deviceOem"
              rules={[{ required: true }]}
            >
              <Input size="small" />
            </Form.Item>
          </div>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea size="small" />
          </Form.Item>
          <Form.Item
            label="Upload File"
            name="attachments"
            rules={[{ required: true, message: "Upload is required" }]}
          >
            <MultiUpload size="small" />
          </Form.Item>

          {isDifferent && project.isAssigned && (
            <Alert
              type="warning"
              description={
                <div>
                  As-Built values differ from design:
                  <br />
                  <span className="text-purple-600">
                    {different.map((n) => fields[n]).join(", ")}
                  </span>
                  <br />
                  Review will be requested from engineer{" "}
                  <span className="text-purple-600">
                    {project.assignee.staff.name}
                  </span>
                  .
                </div>
              }
            />
          )}
        </Form>
      </div>
    </CustomModal>
  );
};
