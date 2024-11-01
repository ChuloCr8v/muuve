import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useReportFaultMutation } from "../../api/devices.api";
import { Device } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  device: Device;
}

export const ReportFaultModal = ({ device }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [reportFault, { isLoading }] = useReportFaultMutation();

  const submit = async () => {
    const values = await form.validateFields();
    reportFault({ ...values, id: device.id })
      .unwrap()
      .then(() => {
        message.success("Fault Reported");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Report Fault"
      onSubmit={submit}
      okText="Report"
      isDanger
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical" className="space-y-[12px]">
          <Form.Item
            label="Comment"
            name="comment"
            required
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            name="attachments"
            label="Upload Device Images"
            rules={[{ required: true, message: "Upload is required" }]}
          >
            <MultiUpload />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
