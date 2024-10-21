import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, MenuProps } from "antd";
import { useState } from "react";
import ActionPopup from "../../global/ActionPopup";
import AssignDevice from "./actionForms/AssignDevice";
import DeviceFault from "./actionForms/DevicefFault";
import DeleteDevice from "./actionForms/DeleteDevice";
import DeviceDetails from "./DeviceDetails";
import { useAssignDeviceMutation } from "../../../api/devices";

interface Prop {
  selectedRow: any;
  setSelectedRow: any;
  setnewDevice: any;
}

export default function DeviceAction(props: Prop) {
  const [form] = Form.useForm()
  const { selectedRow, setSelectedRow, setnewDevice } = props;
  const [actionType, setactionType] = useState<string | null>(null);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [deviceDetail, setDeviceDetail] = useState(false);
  const [assignDevice, {isLoading: loadAssinAction}] = useAssignDeviceMutation()

  console.log(selectedRow)

  const handleRowClick = (record: any) => {
    setSelectedRow(record); 
    setDeviceDetail(true); 
  };

  const handleEdit = (record: any) => {
    setnewDevice(true);
    setSelectedRow(record);
  };

  const actionClick = (action: string) => {
    setactionType(action);
    setOpenActionModal(true);
  };

  const items = (record: any): MenuProps["items"] => [
    {
      key: "1",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleRowClick(selectedRow),
    },
    {
      key: "2",
      label: "Edit Details",
      icon: <EditOutlined />,
      onClick: () => handleEdit(selectedRow),
    },
    {
      key: "3",
      label: "Assign Device",
      icon: <UserAddOutlined />,
      onClick: () => actionClick("Assign Device"),
    },
    {
      key: "4",
      label: "Report Fault",
      icon: <CloseCircleOutlined />,
      onClick: () => actionClick("Report Fault"),
    },
    {
      key: "5",
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: () => actionClick("Delete"),
    },
  ];

  const Submit = async () => {
    const values = await form.validateFields();  // Get form values (like selected user/job)
    try {
      await assignDevice({
        deviceIds: selectedRow.id, // Assuming the device ID is in the selectedRow
        assigneeId: values.assigneeId, // This is the selected user/job from the form
      });
      setOpenActionModal(false); // Close modal on success
    } catch (error) {
      console.error("Failed to assign device:", error);
    }
  };

  return (
    <div>
      <Dropdown menu={{ items: items(selectedRow) }}>
        <Button>Action</Button>
      </Dropdown>

      <ActionPopup
        loaidng={actionType === 'Assign Device' && loadAssinAction}
        open={openActionModal}
        onCancel={() => setOpenActionModal(false)}
        onOk={actionType === 'Assign Device' && Submit}
        title={actionType} sendButtonText={`${actionType}`}>
        {actionType === "Assign Device" ? (
          <AssignDevice form={form} selectedRow={selectedRow} />
        ) : actionType === "Report Fault" ? (
          <DeviceFault setOpenActionModal={setOpenActionModal} selectedRow={selectedRow} />
        ) : (
          <DeleteDevice selectedRow={selectedRow} />
        )}
      </ActionPopup>

      <DeviceDetails
        setDeviceDetail={setDeviceDetail}
        deviceDetail={deviceDetail}
        selectedRow={selectedRow}
      />
    </div>
  );
}
