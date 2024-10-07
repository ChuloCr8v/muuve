import { Form, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PiUserCheckLight, PiUserSwitch } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../../../redux/popupSlice";
import ActionPopup from "../../global/ActionPopup";
import CustomLabel from "../../onboarding/CustomLabel";
import { popupInterface } from "../../../types";

const AssignProjectModal = () => {
  const [comment, setComment] = useState("");
  const [designEngineer, setDesignEngineer] = useState("");
  const { currentPopup } = useSelector((state: popupInterface) => state.popups);
  const { isOpen, data, currentProject, action } = currentPopup;

  const dispatch = useDispatch();

  const handleAssignJob = () => {
    switch (action?.toLowerCase()) {
      case "assign Job":
        console.log("assign job");
        break;
      default:
        console.log("reassign job");
    }
  };

  const handleAssignSurvey = () => {
    switch (action?.toLowerCase()) {
      case "assign survey":
        console.log("assign survey");
        break;
      default:
        console.log("reassign survey");
    }
  };

  const handleAssignAction = () => {
    switch (currentProject?.toLowerCase()) {
      case "survey":
        handleAssignSurvey;
        break;
      default:
        handleAssignJob;
    }
  };

  const icon = action?.toLowerCase().includes("reassign") ? (
    <PiUserSwitch />
  ) : (
    <PiUserCheckLight />
  );

  return (
    <ActionPopup
      onOk={handleAssignAction}
      open={isOpen && action?.includes("assign")}
      onCancel={() => dispatch(hidePopup())}
      title={<p>{action}</p>}
      sendButtonText={
        action?.toLowerCase().includes("reassign") ? "Reassign" : "Assign"
      }
      icon={
        <span className="text-4xl bg-blue-50 rounded-full p-2">{icon}</span>
      }
    >
      <div>
        <p className="text-grey pb-3">
          {action?.toLowerCase() === "assign job" ? "Assign" : "Reassign"}{" "}
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
    </ActionPopup>
  );
};

export default AssignProjectModal;
