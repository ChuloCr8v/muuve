import { CloudUploadOutlined, EyeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { BiTrash } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { GrAtm } from "react-icons/gr";
import { PiUserSwitch } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import DropdownCustomItem from "../component/Global/DropdownCustomItem";
import { closeProjectDetailsDrawer, showPopup } from "../redux/popupSlice";
import { LuUserCheck } from "react-icons/lu";
import { popupInterface } from "../types";

const useSurveyActionItems = () => {
  const { currentPopup } = useSelector((state: popupInterface) => state.popups);
  const { data } = currentPopup;
  const dispatch = useDispatch();

  const handleShowPopup = (
    e: { stopPropagation: () => void },
    action: string
  ) => {
    e.stopPropagation();
    if (action === "edit details") {
      dispatch(closeProjectDetailsDrawer());
    }
    dispatch(
      showPopup({
        data: data,
        currentProject: "survey",
        action: action,
      })
    );
  };

  // survey action items
  const surveyActionItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <DropdownCustomItem
          label={"Edit Details"}
          icon={<EyeOutlined className="" />}
        />
      ),
      // onClick: () => showModal('Edit Details', '/path/to/edit-icon.svg'),
    },
    {
      key: 2,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "initiate payment")}
        >
          <DropdownCustomItem
            label={"Initiate Payment"}
            icon={<GrAtm className="" />}
          />
        </div>
      ),
    },

    {
      key: 3,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "upload receipt")}>
          <DropdownCustomItem
            label={"Upload Receipt"}
            icon={<CloudUploadOutlined className="" />}
          />
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "assign survey")}>
          <DropdownCustomItem
            label={"Assign Survey"}
            icon={<LuUserCheck className="" />}
          />
        </div>
      ),
    },

    {
      key: 5,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "reassign survey")}
        >
          <DropdownCustomItem
            label={"Reassign"}
            icon={<PiUserSwitch className="" />}
          />
        </div>
      ),
    },
    {
      key: 6,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reject survey")}>
          <DropdownCustomItem
            label={"Reject Survey"}
            icon={<CgCloseO className="" />}
          />
        </div>
      ),
    },
    {
      key: 7,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "delete survey")}>
          <DropdownCustomItem
            label={"Delete"}
            icon={<BiTrash className="" />}
          />
        </div>
      ),
    },
  ];

  return { surveyActionItems };
};

export default useSurveyActionItems;
