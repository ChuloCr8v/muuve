import { Form, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAssignProjectMutation } from "../../api/project.api";
import { useListStaffQuery } from "../../api/staff.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useState } from "react";

interface Props {
  project: Project;
}

export const AssignJobModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [slaType, setSlaType] = useState("Working Days");

  const { data: staffUser } = useListStaffQuery();
  const [assign, { isLoading }] = useAssignProjectMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const isWorkingDays = slaType === "Working Days" ? true : false;
    const data = { ...values, id: project.id, isWorkingDays };
    assign(data)
      .unwrap()
      .then(() => {
        message.success("Job Assigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Assign Job"
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
            rules={[{ required: true }]}
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
            label="Design Due Date"
            required
            name="slaDays"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              addonAfter={
                <Select
                  onChange={(v) => setSlaType(v)}
                  defaultValue={"Working Days"}
                  options={[
                    { label: "Working Days", value: "Working Days" },
                    { label: "All Days", value: "All Days" },
                  ]}
                />
              }
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
