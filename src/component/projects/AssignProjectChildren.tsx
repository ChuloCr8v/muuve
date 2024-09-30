import { Form, Select } from "antd";
import CustomLabel from "../onboarding/CustomLabel";
import TextArea from "antd/es/input/TextArea";
import { JobOrderType, SurveyDataType } from "../../types";

type Props = {
  designEngineer: string;
  comment: string;
  setComment: (arg0: string) => void;
  setDesignEngineer: (arg0: string) => void;
  data?: SurveyDataType | JobOrderType;
  action?: string;
};

const AssignProjectChildren = ({
  data,
  designEngineer,
  setDesignEngineer,
  comment,
  action,
  setComment,
}: Props) => {
  return (
    <div>
      <p className="text-grey pb-3">
        {action?.includes("reassign") ? "Reassign" : "Assign"}{" "}
        <span className="text-black font-semibold">{data?.title}</span> to a
        design enginner{" "}
      </p>

      <Form layout="vertical">
        <Form.Item label={<CustomLabel label="Design Engineer" required />}>
          <Select
            className="h-8"
            options={[{ label: "Modesta Ekeh", value: "ModestaEkeh" }]}
            onChange={(value) => setDesignEngineer(value)}
            value={designEngineer}
          />
        </Form.Item>
        <Form.Item label={<CustomLabel label="Comment" required />}>
          <TextArea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignProjectChildren;
