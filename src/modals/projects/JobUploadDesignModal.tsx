import { Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useSubmitDesignMutation } from "@/api/project.api";

interface Props {
  project: Project;
}

export const JobUploadDesignModal = ({ project }: Props) => {
  const { design } = project;

  let initialValues = undefined;

  if (design) {
    const { attachments, comment, ...rest } = design;
    initialValues = rest;
  }

  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [uploadDesign, { isLoading }] = useSubmitDesignMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    uploadDesign(data)
      .unwrap()
      .then(() => {
        message.success("Design Submitted");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Upload Design"
      onSubmit={submit}
      loading={isLoading}
      width={950}
      center
    >
      <div className="w-full">
        <Form form={form} layout="vertical" initialValues={initialValues}>
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
              />
            </Form.Item>
            <Form.Item
              label="Terminal equipment type"
              name="terminalEquipmentType"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="Service VLAN"
              name="serviceVlan"
              rules={[{ required: true, message: "Service Vlan is required" }]}
            >
              <Input size="small" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item label="Customer ID" name="customerId">
              <Input size="small" readOnly />
            </Form.Item>
            <Form.Item
              label="Loopback IP"
              name="loopbackIp"
              rules={[{ required: true, message: "Loopback Ip is required" }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="WAN-IP"
              name="wanIp"
              rules={[{ required: true, message: "WAN-IP is Required" }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="LAN-IP"
              name="lanIp"
              rules={[{ required: true, message: "LAN-IP is Required" }]}
            >
              <Input size="small" />
            </Form.Item>
          </div>

          <Form.Item
            label="UPE/CTN interface"
            name="upeCtnInterface"
            rules={[{ required: true, message: "Interface is required" }]}
          >
            <Input size="small" />
          </Form.Item>

          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber size="small" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber size="small" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Connecting Site ID"
              name="connectingSiteId"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input size="small" />
            </Form.Item>
            <Form.Item
              label="Connecting Site Name"
              name="connectingSiteName"
              rules={[{ required: true, message: "LAN-IP is Required" }]}
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
        </Form>
      </div>
    </CustomModal>
  );
};
