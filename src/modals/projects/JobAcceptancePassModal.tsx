import { Checkbox, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useApproveReviewMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const JobAcceptancePassModal = ({ project }: Props) => {
  const [confirm, setConfirm] = useState(false);

  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [approve, { isLoading }] = useApproveReviewMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    approve(data)
      .unwrap()
      .then(() => {
        message.success("Acceptance Approved");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Pass Performance Review"
      onSubmit={submit}
      okText="Submit"
      loading={isLoading}
      disabled={!confirm}
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

          <Form.Item>
            <Checkbox onChange={(e) => setConfirm(e.target.checked)}>
              I confirm that the performance review for this project is approved
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
