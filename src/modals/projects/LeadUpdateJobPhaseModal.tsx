import { Form, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useListProjectPhasesQuery } from "../../api/org.api";
import { useUpdateProjectPhaseMutation } from "../../api/project.api";
import { Project, ProjectStage } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useEffect, useState } from "react";

interface Props {
  project: Project;
}

export const LeadUpdateJobPhaseModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();
  const [phase, setPhase] = useState<string>();

  const canChooseAtp = phase === ProjectStage.COMPLETED;

  useEffect(() => {
    if (canChooseAtp) form.setFieldValue("atp", "yes");
  }, [canChooseAtp, form]);

  const { data: phases } = useListProjectPhasesQuery();
  const [update, { isLoading }] = useUpdateProjectPhaseMutation();

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
      title="Update Project Status"
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
              onChange={setPhase}
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

          {canChooseAtp && (
            <Form.Item name="atp" label="ATP action" required>
              <Select
                options={[
                  { value: "yes", label: "Start ATP" },
                  { value: "no", label: "No ATP" },
                ]}
              />
            </Form.Item>
          )}

          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Upload File"
            name="attachments"
            rules={[{ required: true, message: "Upload is required" }]}
          >
            <MultiUpload />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
