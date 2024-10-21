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
  vendor?: { id: string; isActive: boolean; name: string };
};

const VendorActionItems = (props: Props) => {
  // console.log(props.vendor);

  const dispatch = useAppDispatch();

  const isActive = () => {
    if (props.vendor?.isActive) {
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
            isOpen: DrawerState.EDIT_VENDOR_DRAWER,
            id: props.vendor?.id,
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
              ? PopupState.DEACTIVATE_VENDOR
              : PopupState.ACTIVATE_VENDOR,
            id: props.vendor?.id,
            isEditingData: true,
            action: isActive() ? "deactivate" : "activate",
          })
        );
      },
    },
  ];
  return { items };
};

export default VendorActionItems;
