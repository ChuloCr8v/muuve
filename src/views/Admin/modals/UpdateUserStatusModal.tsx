import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../api/data";
import ActionPopup from "../../../components/global/ActionPopup";
import {
  useListStaffQuery,
  useUpdateStaffStatusMutation,
} from "../../../api/staff.api";
// import { User } from "../../../api/types";
import { closePopup, PopupState } from "../../../redux/popupSlice";
import { message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { FaBan } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useListCustomersQuery } from "../../../api/customer.api";
import { useListVendorQuery } from "../../../api/vendor";

const openTriggers = [
  PopupState.DEACTIVATE_CUSTOMER,
  PopupState.ACTIVATE_CUSTOMER,
  PopupState.ACTIVATE_STAFF,
  PopupState.DEACTIVATE_STAFF,
  PopupState.ACTIVATE_VENDOR,
  PopupState.DEACTIVATE_VENDOR,
];

const UpdateUSerStatusModal = () => {
  const [currentUser, setCurrentUser] = useState<any>(); //fix type later
  const { currentPopup } = useAppSelector((state) => state.popups);
  const [updateStaffStatus, { isLoading }] = useUpdateStaffStatusMutation();

  const { isOpen, action, id } = currentPopup;

  const open = openTriggers.find((trigger) => trigger === (isOpen ?? false));

  const dispatch = useAppDispatch();

  const listStaff = useListStaffQuery();
  const listCustomers = useListCustomersQuery();
  const listVendor = useListVendorQuery();

  const currentModule = () => {
    switch (isOpen) {
      case PopupState.ACTIVATE_CUSTOMER:
      case PopupState.DEACTIVATE_CUSTOMER:
        return listCustomers.data;
      case PopupState.ACTIVATE_STAFF:
      case PopupState.DEACTIVATE_STAFF:
        return listStaff.data;
      case PopupState.DEACTIVATE_VENDOR:
      case PopupState.ACTIVATE_VENDOR:
        return listVendor.data;
      default:
        return listStaff.data;
    }
  };

  const currentSubDetail = () => {
    switch (isOpen) {
      case PopupState.ACTIVATE_CUSTOMER:
      case PopupState.DEACTIVATE_CUSTOMER:
        return currentUser?.customer;
      case PopupState.ACTIVATE_STAFF:
      case PopupState.DEACTIVATE_STAFF:
        return currentUser?.staff;
      case PopupState.DEACTIVATE_VENDOR:
      case PopupState.ACTIVATE_VENDOR:
        return currentUser?.vendor;
      default:
        return listStaff.data;
    }
  };

  useEffect(() => {
    const getUser = currentModule()?.find((user) => user.id === id);
    setCurrentUser(getUser);
  }, [id]);

  //   console.log(currentModule());

  const handleUpdateStaffStatus = async () => {
    try {
      await updateStaffStatus({
        id: currentUser?.id,
      }).unwrap();
      message.success("Staff deactivated successfully");
      dispatch(closePopup());
    } catch (error) {
      console.log(error);
      message.error("Unable to deactivate staff, try again");
    }
  };

  const btnStyle = () => {
    switch (action?.toLowerCase()) {
      case "deactivate":
        return "bg-red-600 hover:!bg-red-800";
      default:
        return "bg-primary";
    }
  };

  return (
    <ActionPopup
      icon={
        <div
          className={twMerge(
            "text-4xl rounded-full h-16 w-16 flex flex-col items-center justify-center  bg-opacity-10",
            currentUser?.isActive ? " bg-red-600 text-red-600" : " bg-primary"
          )}
        >
          {currentUser?.isActive ? <FaBan /> : <CheckCircleOutlined />}
        </div>
      }
      loading={isLoading}
      open={!!open}
      title={
        action +
        " " +
        (isOpen === PopupState.ACTIVATE_VENDOR ||
        isOpen === PopupState.DEACTIVATE_VENDOR
          ? currentSubDetail()?.spocName
          : currentSubDetail()?.name)
      }
      onCancel={() => dispatch(closePopup())}
      sendButtonText={action}
      sendButtonStyle={btnStyle()}
      onOk={handleUpdateStaffStatus}
    >
      Are you sure you want to {action}{" "}
      <span className="font-semibold ">
        {isOpen === PopupState.ACTIVATE_VENDOR ||
        isOpen === PopupState.DEACTIVATE_VENDOR
          ? currentSubDetail()?.spocName
          : currentSubDetail()?.name}
      </span>
      ?
    </ActionPopup>
  );
};

export default UpdateUSerStatusModal;
