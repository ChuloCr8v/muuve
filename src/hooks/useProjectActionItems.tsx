import {
  EyeOutlined,
  CloudUploadOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { BiUserCheck, BiTrash, BiCheckCircle } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { GrAtm } from "react-icons/gr";
import { PiUserSwitch } from "react-icons/pi";
import { FiUserCheck } from "react-icons/fi";
import DropdownCustomItem from "../components/global/DropdownCustomItem";

type Props = {
  handleShowPopup: (e: { stopPropagation: () => void }, action: string) => void;
};

const useProjectActionItems = ({ handleShowPopup }: Props) => {
  // survey action items
  const survetyActionItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <DropdownCustomItem label={"Edit Details"} icon={<EyeOutlined />} />
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
            icon={<CloudUploadOutlined />}
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
            icon={<BiUserCheck className="text-2xl" />}
          />
        </div>
      ),
    },

    {
      key: 5,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reassign")}>
          <DropdownCustomItem
            label={"Reassign"}
            icon={<PiUserSwitch className="text-2xl" />}
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
            icon={<CgCloseO className="text-xl" />}
          />
        </div>
      ),
    },
    {
      key: 7,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "delete")}>
          <DropdownCustomItem
            label={"Delete"}
            icon={<BiTrash className="text-xl" />}
          />
        </div>
      ),
    },
  ];

  // Job Order Action Items

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
        <div className="" onClick={(e) => handleShowPopup(e, "assign job")}>
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
        <div className="" onClick={(e) => handleShowPopup(e, "reassign job")}>
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
        <div className="">
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

  return { survetyActionItems, jobOrderActionItems };
};

export default useProjectActionItems;
