import { Form, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useReassignProjectMutation } from "../../api/project.api";
import { useListStaffQuery } from "../../api/staff.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const ReassignJobModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const { data: staffUser } = useListStaffQuery();
  const [assign, { isLoading }] = useReassignProjectMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    assign(data)
      .unwrap()
      .then(() => {
        message.success("Job Reassigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Reassign Job"
      onSubmit={submit}
      okText="Assign"
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Assignee"
            required
            name="assigneeId"
            rules={[{ required: true, message: "Assignee is required" }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={staffUser?.map((s) => ({
                label: s.staff.name,
                value: s.id,
              }))}
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
