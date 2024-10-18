import {
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { BiCheckCircle } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import {
  DrawerState,
  openDrawer,
  openPopup,
  PopupState,
} from "../redux/popupSlice";
import DropdownCustomItem from "../components/global/DropdownCustomItem";
import { useAppDispatch } from "../api/data";

const useJobOrderActionItems = (id: string) => {
  const dispatch = useAppDispatch();

  const handleShowPopup = (
    e: { stopPropagation: () => void },
    action: string,
    trigger: string
  ) => {
    e.stopPropagation();
    if (action === "edit details") {
      dispatch(
        openDrawer({
          id: id,
          isOpen: DrawerState.EDIT_JOBORDER_DRAWER,
        })
      );
    }
    dispatch(
      openPopup({
        id: id,
        action: action,
        isOpen: trigger,
      })
    );
  };

  const jobOrderActionItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <div
          className=""
          onClick={(e) => handleShowPopup(e, "edit details", "edit")}
        >
          <DropdownCustomItem label={"Edit Details"} icon={<EyeOutlined />} />
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div
          className=""
          onClick={(e) =>
            handleShowPopup(e, "assign job", PopupState.ASSIGN_JOBORDER)
          }
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
          onClick={(e) =>
            handleShowPopup(e, "reassign job", PopupState.REASSIGN_JOBORDER)
          }
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
            handleShowPopup(e, "reject job", PopupState.REJECT_JOBORDER);
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
          onClick={(e) =>
            handleShowPopup(e, "delete-job", PopupState.DELETE_JOBORDER)
          }
        >
          <DropdownCustomItem label={"Delete"} icon={<DeleteOutlined />} />{" "}
        </div>
      ),
    },
    {
      key: 8,
      label: (
        <div
          className=""
          onClick={(e) =>
            handleShowPopup(e, "sign off", PopupState.SIGNOFF_JOBORDER)
          }
        >
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
