import { Button, Form, Upload, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dispatch, SetStateAction } from "react";
import { SurveyDataType } from "../../../types";
import CustomLabel from "../../onboarding/CustomLabel";

type Props = {
  comment: string;
  setComment: (arg0: string) => void;
  fileList: UploadFile<any>[];
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
  data?: SurveyDataType;
};

const InitiatePaymentChildren = ({
  data,
  comment,
  setComment,
  fileList,
  setFileList,
}: Props) => {
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  return (
    <div>
      <p className="text-grey pb-3">
        Initiate payment for{" "}
        <span className="text-black font-semibold">{data?.id}</span>
      </p>

      <Form layout="vertical">
        <Form.Item
          label={
            <CustomLabel
              label="Upload Invoice"
              extra=" (Max: 10 files, 10mb each)"
              required
            />
          }
        >
          <div className="flex items-center gap-3">
            <div className="h-8 border w-full rounded p-2">
              {fileList[0]?.name}
            </div>
            <Upload {...props}>
              <Button className="h-8 font-semibold">Browse</Button>
            </Upload>
          </div>
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

export default InitiatePaymentChildren;
