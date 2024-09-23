import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { JobOrderType, SurveyDataType } from "../../types";
import CustomLabel from "../onboarding/CustomLabel";

const RejectProjectChildren = ({
  data,
  comment,
  setComment,
}: {
  data?: SurveyDataType | JobOrderType;
  comment: string;
  setComment: (arg0: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <p className="">
        Are you sure you want to reject <b>{data?.id}</b>
      </p>
      <Form layout="vertical" className="mt-2">
        <Form.Item label={<CustomLabel label="Give your reason" required />}>
          <TextArea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RejectProjectChildren;
