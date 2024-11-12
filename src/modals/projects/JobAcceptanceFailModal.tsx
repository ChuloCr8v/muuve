import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRejectReviewMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const JobAcceptanceFailModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [approve, { isLoading }] = useRejectReviewMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    approve(data)
      .unwrap()
      .then(() => {
        message.success("Acceptance Rejected");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Fail Performance Review"
      onSubmit={submit}
      okText="Submit"
      isDanger
      loading={isLoading}
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
          <Form.Item label="Upload File" name="attachments">
            <MultiUpload />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
