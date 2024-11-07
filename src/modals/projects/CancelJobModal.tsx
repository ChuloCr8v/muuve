import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCancelProjectMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const CancelJobModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();
  const [cancel, { isLoading }] = useCancelProjectMutation();

  const submit = async () => {
    const values = await form.validateFields();

    const data = { ...values, id: project.id };
    cancel(data)
      .unwrap()
      .then(() => {
        message.success("Request Sent");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Request Project Cancellation"
      onSubmit={submit}
      okText="Request"
      loading={isLoading}
      isDanger
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Upload one or more files"
            name="attachments"
            rules={[{ required: true, message: "Upload is required" }]}
          >
            <MultiUpload />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
