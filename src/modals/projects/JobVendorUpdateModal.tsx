import { Form, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useListProjectPhasesQuery } from "../../api/org.api";
import { Project, ProjectStage } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useVendorProjectUpdateMutation } from "../../api/project.api";

interface Props {
  project: Project;
}

export const JobVendorUpdateModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const { data: phases } = useListProjectPhasesQuery();
  const [update, { isLoading }] = useVendorProjectUpdateMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    update(data)
      .unwrap()
      .then(() => {
        message.success("Status Update Sent");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Send Status Update"
      onSubmit={submit}
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Phase"
            required
            name="phase"
            rules={[{ required: true, message: "Assignee is required" }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={[
                ...(phases?.map((p) => ({
                  label: p.name,
                  value: p.name,
                })) || []),
                { label: "Completed", value: ProjectStage.COMPLETED },
              ]}
            />
          </Form.Item>
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
