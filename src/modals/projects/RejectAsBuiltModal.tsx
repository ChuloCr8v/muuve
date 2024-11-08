import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRejectAsBuiltMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const RejectAsBuiltModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [reject, { isLoading }] = useRejectAsBuiltMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    reject(data)
      .unwrap()
      .then(() => {
        message.success("As-Built Rejected");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Reject As-Built"
      onSubmit={submit}
      okText="Submit"
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
          <Form.Item label="Upload File" name="attachments">
            <MultiUpload />
          </Form.Item>
          {/* 
          <Form.Item rules={[{ required: true }]}>
            <Checkbox required>Confirm this action</Checkbox>
          </Form.Item> */}
        </Form>
      </div>
    </CustomModal>
  );
};
