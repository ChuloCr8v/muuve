import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import DropdownCustomItem from "../../../components/global/DropdownCustomItem";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "../../../api/data";
import {
  DrawerState,
  openDrawer,
  openPopup,
  PopupState,
} from "../../../redux/popupSlice";

type Props = {
  staff?: { id: string; status: string; name: string };
};

const StaffActionItems = (props: Props) => {
  //   console.log(props.staff);

  const dispatch = useAppDispatch();

  const isActive = () => {
    if (props.staff?.status.toLowerCase() === "active") {
      return true;
    } else return false;
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <DropdownCustomItem label={"Edit"} icon={<EditOutlined />} />,
      onClick: () =>
        dispatch(
          openDrawer({
            isOpen: DrawerState.EDIT_STAFF_DRAWER,
            id: props.staff?.id,
            isEditigData: true,
          })
        ),
    },
    {
      key: "2",
      label: (
        <DropdownCustomItem
          className={twMerge("!text-green-600", isActive() && "!text-red-600")}
          label={isActive() ? "Deactivate" : "Activate"}
          icon={
            isActive() ? (
              <CloseCircleOutlined className="!text-base" />
            ) : (
              <CheckCircleOutlined className="!text-base" />
            )
          }
        />
      ),
      onClick: () => {
        dispatch(
          openPopup({
            isOpen: isActive()
              ? PopupState.DEACTIVATE_STAFF
              : PopupState.ACTIVATE_STAFF,
            id: props.staff?.id,
            isEditingData: true,
            action: isActive() ? "deactivate" : "activate",
          })
        );
      },
    },
  ];
  return { items };
};

export default StaffActionItems;
