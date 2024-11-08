import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useAcceptAsBuiltMutation } from "@/api/project.api";

interface Props {
  project: Project;
}

export const AcceptAsBuiltModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [accept, { isLoading }] = useAcceptAsBuiltMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    accept(data)
      .unwrap()
      .then(() => {
        message.success("As-Built Accepted");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Accept As-Built"
      onSubmit={submit}
      okText="Submit"
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
          {/* 
          <Form.Item rules={[{ required: true }]}>
            <Checkbox required>Confirm this action</Checkbox>
          </Form.Item> */}
        </Form>
      </div>
    </CustomModal>
  );
};
