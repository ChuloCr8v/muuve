import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRevertProjectMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const JobRevertModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [revert, { isLoading }] = useRevertProjectMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    revert(data)
      .unwrap()
      .then(() => {
        message.success("Reverted");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Revert Project"
      isDanger
      onSubmit={submit}
      loading={isLoading}
      okText="Revert"
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
