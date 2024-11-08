import { Checkbox, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSkipEatpMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useState } from "react";

interface Props {
  project: Project;
}

export const SkipEatpModal = ({ project }: Props) => {
  const [confirm, setConfirm] = useState(false);

  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [comment, { isLoading }] = useSkipEatpMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    comment(data)
      .unwrap()
      .then(() => {
        message.success("ATP Closed");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Close ATP Now"
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
              I confirm that ATP should be skipped for this job.
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
