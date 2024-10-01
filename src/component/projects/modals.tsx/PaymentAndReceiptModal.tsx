import { Form, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import MultiUpload from "../../Global/MultipleUpload";
import CustomLabel from "../../onboarding/CustomLabel";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hidePopup, popupInterface } from "../../../redux/popupSlice";
import { IoCloseCircleOutline } from "react-icons/io5";
import ActionPopup from "../../Global/ActionPopup";
import { BiReceipt, BiUpload } from "react-icons/bi";
import { CloudUploadOutlined } from "@ant-design/icons";
import { MdPayment } from "react-icons/md";

const PaymentAndReceiptChildren = () => {
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);
  const [comment, setComment] = useState("");

  const { currentPopup } = useSelector((state: popupInterface) => state.popups);
  const { isOpen, data, action } = currentPopup;

  const dispatch = useDispatch();
  const handleInitiatePayment = () => {
    console.log("initiate payment");
  };

  const handleUploadReceipt = () => {
    console.log("Upload Receipt");
  };

  return (
    <ActionPopup
      onOk={
        action?.toLowerCase() === "upload receipt"
          ? handleUploadReceipt
          : handleInitiatePayment
      }
      open={
        isOpen &&
        (action?.includes("upload receipt") ||
          action?.includes("initiate payment"))
      }
      onCancel={() => dispatch(hidePopup())}
      title={<p>{action}</p>}
      sendButtonText={
        action?.toLowerCase() === "initiate payment" ? "Initiate" : "upload"
      }
      icon={
        <span className="text-4xl bg-blue-50 rounded-full p-2">
          {action?.toLowerCase() === "upload receipt" ? (
            <CloudUploadOutlined />
          ) : (
            <MdPayment />
          )}
        </span>
      }
      sendButtonStyle={"bg-blue-500 hover:!bg-blue-700"}
    >
      <div>
        <p className="text-grey pb-3">
          {action?.toLowerCase() === "upload receipt"
            ? " Upload Reciept"
            : "Initiate payment"}{" "}
          for <span className="text-black font-semibold">{data?.title}</span>
        </p>

        <Form layout="vertical">
          <Form.Item
            label={
              <CustomLabel
                label={
                  action?.toLowerCase() === "upload recept"
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
    </ActionPopup>
  );
};

export default PaymentAndReceiptChildren;
