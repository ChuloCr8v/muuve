import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, MenuProps, message } from "antd";
import { useState } from "react";
import ActionPopup from "../../global/ActionPopup";
import AssignDevice from "./actionForms/AssignDevice";
import DeviceFault from "./actionForms/DevicefFault";
import DeleteDevice from "./actionForms/DeleteDevice";
import DeviceDetails from "./DeviceDetails";
import { useAssignDeviceMutation } from "../../../api/devices";
import { toastApiError } from "../../../utils/error.util";

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
    const values = await form.validateFields(); 
    const data = {...values, id: selectedRow.id}
    console.log(data)

    assignDevice(data).unwrap()
    .then(() => {
      message.success("Device Assigned")
      setOpenActionModal(false)
    })
    .catch(toastApiError)
  };

  return (
    <div>
      <Dropdown menu={{ items: items(selectedRow) }}>
        <Button>Action</Button>
      </Dropdown>

      <ActionPopup
        loading={actionType === 'Assign Device' && loadAssinAction}
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
