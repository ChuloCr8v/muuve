import {
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { BiCheckCircle } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import DropdownCustomItem from "../component/Global/DropdownCustomItem";
import {
  closeProjectDetailsDrawer,
  popupInterface,
  showPopup,
} from "../redux/popupSlice";

const useJobOrderActionItems = () => {
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
        currentProject: "job orders",
        action: action,
      })
    );
  };

  const jobOrderActionItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "edit details")}>
          <DropdownCustomItem label={"Edit Details"} icon={<EyeOutlined />} />
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "assign job order")}
        >
          <DropdownCustomItem
            label={"Assign Job"}
            icon={<FiUserCheck className="text-xl" />}
          />
        </div>
      ),
    },

    {
      key: 5,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "reassign job order")}
        >
          <DropdownCustomItem
            label={"Reassign Job"}
            icon={<UserSwitchOutlined />}
          />
        </div>
      ),
    },
    {
      key: 6,
      label: (
        <div
          className=""
          onClick={(e) => {
            handleShowPopup(e, "reject job order");
          }}
        >
          <DropdownCustomItem
            label={"Reject Job"}
            icon={<CloseCircleOutlined />}
          />
        </div>
      ),
    },
    {
      key: 7,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "delete job order")}
        >
          <DropdownCustomItem label={"Delete"} icon={<DeleteOutlined />} />{" "}
        </div>
      ),
    },
    {
      key: 8,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "sign off")}>
          <DropdownCustomItem
            label={"Sign Off"}
            icon={<BiCheckCircle />}
            className="text-green-600"
          />
        </div>
      ),
    },
  ];

  return { jobOrderActionItems };
};

export default useJobOrderActionItems;
