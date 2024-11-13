import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import {
  useApproveRequestedPhaseMutation,
  useDenyRequestedPhaseMutation,
} from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { formatStatusEnum } from "../../utils/formatEnum";

interface Props {
  project: Project;
}

export const JobRespondPhaseModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [deny, { isLoading: isDenying }] = useDenyRequestedPhaseMutation();
  const [approve, { isLoading: isApproving }] =
    useApproveRequestedPhaseMutation();
  const isSubmitting = isApproving || isDenying;

  const [approved, setApproved] = useState<boolean | undefined>();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    const submit = approved ? approve(data) : deny(data);
    submit
      .unwrap()
      .then(() => {
        message.success(`Request ${approved ? "Approved" : "Denied"}`);
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title={`Aprove/Deny ${formatStatusEnum(project.unapprovedStage)} Phase`}
      onSubmit={submit}
      okText={approved ? "Approve" : "Deny"}
      loading={isSubmitting}
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              htmlType="button"
              icon={approved === true ? <CheckCircleOutlined /> : undefined}
              type={approved === true ? "primary" : "default"}
              onClick={() => setApproved(true)}
            >
              Approve
            </Button>
            <Button
              htmlType="button"
              icon={approved === false ? <CloseCircleOutlined /> : undefined}
              type={approved === false ? "primary" : "default"}
              onClick={() => setApproved(false)}
            >
              Deny
            </Button>
          </div>

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
