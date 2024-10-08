import { Form, message, Select } from "antd";
import { CustomModal } from "../../components/common/CustomModal";
import { useListStaffQuery } from "../../api/staff.api";
import TextArea from "antd/es/input/TextArea";
import { useReassignSurveyMutation } from "../../api/surveys.api";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { Survey } from "../../api/types";

interface Props {
  survey: Survey;
}

export const ReassignSurveyModal = ({ survey }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const { data: staffUser } = useListStaffQuery();
  const [reassignSurvey, { isLoading }] = useReassignSurveyMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, surveyId: survey.surveyId, id: survey.id };
    reassignSurvey(data)
      .unwrap()
      .then(() => {
        message.success("Survey Reassigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Reassign Survey"
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
                value: s.staff.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Comment" name="comment">
            <TextArea />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
