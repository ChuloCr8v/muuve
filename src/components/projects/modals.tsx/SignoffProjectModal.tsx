import { useDispatch, useSelector } from "react-redux";
import ActionPopup from "../../global/ActionPopup";
import { BsCheckCircle } from "react-icons/bs";
import { popupInterface } from "../../../types";
import { closePopup } from "../../../redux/popupSlice";

const SignoffProjectModal = () => {
  const { currentPopup } = useSelector((state: popupInterface) => state.popups);
  const { isOpen, data, currentProject, action } = currentPopup;

  const dispatch = useDispatch();

  const handleProjectSignOff = () => {
    if (currentProject === "job orders") {
      console.log(action + "job orders");
      return;
    }
    console.log(action + "survey");
  };

  return (
    <ActionPopup
      onOk={handleProjectSignOff}
      open={isOpen && action?.includes("sign off")}
      onCancel={() => dispatch(closePopup())}
      title={<p>{action}</p>}
      sendButtonText={"Sign Off"}
      icon={
        <span className="text-4xl bg-blue-50 rounded-full p-3">
          <BsCheckCircle />
        </span>
      }
    >
      <div>
        <p className="">
          Sign off <span className="font-semibold">{data?.title}</span>?
        </p>
      </div>
    </ActionPopup>
  );
};

export default SignoffProjectModal;
