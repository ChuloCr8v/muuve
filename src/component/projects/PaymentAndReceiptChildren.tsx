import { Button, Form, Upload, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dispatch, SetStateAction } from "react";
import { SurveyDataType } from "../../types";
import CustomLabel from "../onboarding/CustomLabel";
import MultiUpload from "../Global/MultipleUpload";

type Props = {
  comment: string;
  setComment: (arg0: string) => void;
  fileList: UploadFile<File>[];
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
  data?: SurveyDataType;
  action: string;
};

const PaymentAndReceiptChildren = ({
  data,
  comment,
  setComment,
  fileList,
  setFileList,
  action,
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
      <p className="text-grey py-3">
        {action.toLowerCase() === "upload receipt"
          ? " Upload Reciept"
          : "Initiate payment"}{" "}
        for <span className="text-black font-semibold">{data?.title}</span>
      </p>

      <Form layout="vertical">
        <Form.Item
          label={
            <CustomLabel
              label={
                action.toLowerCase() === "upload recept"
                  ? "Upload Invoice"
                  : "Upload Receipt"
              }
              extra=" (Max: 10 files, 10mb each)"
              required
            />
          }
        >
          <div className="flex items-center gap-3">
            <MultiUpload files={fileList} setFiles={setFileList} />
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

export default PaymentAndReceiptChildren;
