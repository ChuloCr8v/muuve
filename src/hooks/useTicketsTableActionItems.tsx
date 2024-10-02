import { UserSwitchOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { BiEdit, BiRefresh, BiUserCheck } from "react-icons/bi";
import DropdownCustomItem from "../component/Global/DropdownCustomItem";

const useTicketsTableActionItems = () => {
  const handleShowPopup = (e: any, value: string) => {
    console.log(e, value);
  };

  const ticketsTableActionItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <DropdownCustomItem label={"Edit"} icon={<BiEdit className="" />} />
      ),
    },
    {
      key: 2,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "assign")}>
          <DropdownCustomItem
            label={"Assign"}
            icon={<BiUserCheck className="text-2xl" />}
          />
        </div>
      ),
    },
    {
      key: 3,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reassign")}>
          <DropdownCustomItem
            label={"Reassign"}
            icon={<UserSwitchOutlined className="" />}
          />
        </div>
      ),
    },
    {
      key: 3,
      label: (
        <div className="" onClick={(e) => handleShowPopup(e, "reopen")}>
          <DropdownCustomItem
            label={"Reopen"}
            icon={<BiRefresh className="text-xl" />}
          />
        </div>
      ),
    },
  ];
  return { ticketsTableActionItems };
};

export default useTicketsTableActionItems;
