import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../../../redux/popupSlice";
import ActionPopup from "../../global/ActionPopup";
import { BiTrashAlt } from "react-icons/bi";
import { popupInterface } from "../../../types";

const DeleteProjectModal = () => {
  const { currentPopup } = useSelector((state: popupInterface) => state.popups);
  const { isOpen, data, currentProject, action } = currentPopup;

  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    if (currentProject === "survey") {
      console.log(action);
      return;
    }
    console.log(action);
  };

  return (
    <ActionPopup
      onOk={handleDeleteProject}
      open={isOpen && action?.includes("delete")}
      onCancel={() => dispatch(hidePopup())}
      title={<p>{action}</p>}
      sendButtonText={"Delete"}
      sendButtonStyle="bg-red-500 hover:bg-red-700"
      icon={
        <span className="text-4xl bg-red-50 text-red-500 rounded-full p-2">
          <BiTrashAlt />
        </span>
      }
    >
      <div>
        <p className="">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{data?.title}</span>. This action
          cannot be undone
        </p>
      </div>
    </ActionPopup>
  );
};

export default DeleteProjectModal;
