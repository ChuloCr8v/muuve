import { Form, message, Select } from "antd";
import { CustomModal } from "../../components/common/CustomModal";
import { useListStaffQuery } from "../../api/staff.api";
import TextArea from "antd/es/input/TextArea";
import { useAssignSurveyMutation } from "../../api/surveys.api";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { Survey } from "../../api/types";
import MultiUpload from "../../components/global/MultiUpload";

interface Props {
  survey: Survey;
}

export const AssignSurveyModal = ({ survey }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const { data: staffUser } = useListStaffQuery();
  const [assignSurvey, { isLoading }] = useAssignSurveyMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, surveyId: survey.surveyId, id: survey.id };
    assignSurvey(data)
      .unwrap()
      .then(() => {
        message.success("Survey Assigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Assign Survey"
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
