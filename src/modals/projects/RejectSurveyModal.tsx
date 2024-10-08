import { Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  useRejectSurveyMutation,
  useRevertSurveyMutation,
} from "../../api/surveys.api";
import { Survey } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  survey: Survey;
}

export const RejectSurveyModal = ({ survey }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [rejectSurvey, { isLoading }] = useRejectSurveyMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, surveyId: survey.surveyId, id: survey.id };
    rejectSurvey(data)
      .unwrap()
      .then(() => {
        message.success("Survey Rejected");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Reject Survey"
      onSubmit={submit}
      okText="Reject"
      loading={isLoading}
      isDanger
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Comment"
            name="comment"
            required
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
