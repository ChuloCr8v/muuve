import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ActionPopup from "../../global/ActionPopup";
import CustomLabel from "../../onboarding/CustomLabel";
import { popupInterface } from "../../../types";
import { closePopup } from "../../../redux/popupSlice";

const RejectProjectChildren = () => {
  const [comment, setComment] = useState("");
  const { currentPopup } = useSelector((state: popupInterface) => state.popups);
  const { isOpen, data, currentProject, action } = currentPopup;

  const dispatch = useDispatch();
  console.log(data);

  const handleRejectSurvey = () => {
    console.log("reject survey");
  };

  const handleRejectJob = () => {
    console.log("reject job");
  };

  return (
    <ActionPopup
      onOk={
        currentProject?.toLowerCase() === "survey"
          ? handleRejectSurvey
          : handleRejectJob
      }
      open={isOpen && action?.includes("reject")}
      onCancel={() => dispatch(closePopup())}
      title={<p>{action}</p>}
      sendButtonText={"Reject"}
      icon={
        <span className="text-5xl bg-red-50 rounded-full p-2">
          <IoCloseCircleOutline className="text-4xl text-red-600" />
        </span>
      }
      sendButtonStyle={"bg-red-500 hover:bg-red-700"}
    >
      <div className="space-y-2">
        <p className="">
          Are you sure you want to reject <b>{data?.title}</b>
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
    </ActionPopup>
  );
};

export default RejectProjectChildren;
