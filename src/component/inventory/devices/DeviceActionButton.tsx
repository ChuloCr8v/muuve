import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import DeviceDetails from "./DeviceDetails";
import { ReactNode, useState } from "react";
import ActionPopup from "../../Global/ActionPopup";
import { twMerge } from "tailwind-merge";
import AssignDevice from "./actionForms/AssignDevice";
import DeviceFault from "./actionForms/DevicefFault";
import DeleteDevice from "./actionForms/DeleteDevice";

interface Prop {
  selectedRow: any;
  deviceDetail: any;
  setSelectedRow: any;
  setDeviceDetail: any;
  setnewDevice: any
  items?: MenuProps["items"];
}

export default function DeviceAction(props: Prop) {
  const { selectedRow, deviceDetail, setDeviceDetail, setSelectedRow, setnewDevice } = props;
  console.log(deviceDetail)
  const[actionType, setactionType] = useState<string | null>(null)
  const [openActionModal, setOpenActionModal] = useState(false)
  console.log(selectedRow);

  const handleRowClick = (record: any) => {
    setSelectedRow(record);
    setDeviceDetail(true);
  };

  const handleEdit = (record: any) => {
    setnewDevice(true)
    setSelectedRow(record)

  }

  const actionClick = (action: string) => {
    setactionType(action)
    setOpenActionModal(true)
  }

  const LabelItem = (props: {label: string, icon: ReactNode, style?: string, }) => {
    console.log(actionType)
    return (
      <div className={twMerge('font-[400] text-[14px] flex space-x-2', props.style)}>
        <p className="">{props.icon}</p>
        <span className={twMerge(props.style)}>{props.label}</span>,
      </div>
      
    )
  }


  const items = (record: any): MenuProps["items"] => [
    {
      key: "1",
      label: <LabelItem label="View Details" icon={<EyeOutlined/>}/>,
      onClick: () => handleRowClick(record),
    },
    {
      key: "2",
      label: <LabelItem label="Edit Details" icon={<EditOutlined />}/>,
      onClick: () => handleEdit(record),
      
    },
    {
      key: "3",
      label: <LabelItem label="Assign Device" icon={<UserAddOutlined />}/>,
      onClick: () => actionClick("Assign Device")
    },
    {
      key: "4",
      label: <LabelItem style="text-red-500 "  label="Report Fault" icon={<CloseCircleOutlined />}/>,
      onClick: () => actionClick("Report Fault")
    },
    {
      key: "5",
      label: <LabelItem style="text-red-500 "   label="Delete" icon={<DeleteOutlined />}/>,
      onClick: () => actionClick("Delete")
    },
  ];
  return (
    <div>
      <Dropdown className={twMerge()} menu={{ items: items(props.items) }}>
        <Button>Action</Button>
      </Dropdown>

      <ActionPopup
        open={openActionModal}
        onCancel={() => setOpenActionModal(false)}
        title={actionType}
        sendButtonText={`${actionType}`}
        icon={
          <div className={twMerge('text-5xl w-[60px] flex h-[60px] items-center justify-center rounded-full  p-2', actionType === "Report Fault" && "Delete" ? 'bg-red-50' : 'bg-[#0A95CC14]')}>
          {actionType === "Assign Device" ? <UserAddOutlined className="text-[30px]" />: actionType === "Report Fault" ? <CloseCircleOutlined className="text-[30px] text-red-600 " /> :  <DeleteOutlined  className="text-[30px] text-red-600 "/>}
        </div>
        }
        sendButtonStyle={`${actionType === 'Report Fault' && 'Delete'  && 'bg-red-600'}`}
      >
        {actionType=== "Assign Device" ? <AssignDevice selectedRow={selectedRow}/> 
        : actionType === "Report Fault" ? <DeviceFault selectedRow={selectedRow}/> 
        : <DeleteDevice selectedRow={selectedRow}/> }
      </ActionPopup>

      <DeviceDetails
        setDeviceDetail={setDeviceDetail}
        deviceDetail={deviceDetail}
        selectedRow={selectedRow}
      />
    </div>
  );
}
