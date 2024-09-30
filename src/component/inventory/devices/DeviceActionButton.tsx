import { DeleteOutlined, EditOutlined, EyeOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, MenuProps } from "antd";
import DeviceDetails from "./DeviceDetails";

interface Prop{
    selectedRow: any;
    deviceDetail: any
    setSelectedRow: any
    setDeviceDetail: any
    items?: MenuProps['items'];
}


export default function DeviceAction (props: Prop) {
    const {selectedRow, deviceDetail, setDeviceDetail, setSelectedRow} = props
    console.log(selectedRow)

    const handleRowClick = (record: any) => {
        setSelectedRow(record)
        setDeviceDetail(true)
    }

    const items = (record: any): MenuProps['items'] => [
        {
            key: '1',
            label: 'View Details',
            icon: <EditOutlined />,
            onClick: () => handleRowClick(record)
        },
        {
          key: '2',
          label: 'Edit Model',
          icon: <EyeOutlined/>
    
      },
      {
        key: '3',
        label: 'Assign Device',
        icon: <EyeOutlined/>
  
    },
      {
        key: '4',
        label: 'Report Fault',
        icon: <WarningOutlined/>
  
    },
    {
        key: '5',
        label: 'Delete',
        icon: <DeleteOutlined/>
  
    },
  
      ]
    return(
        <div>
            <Dropdown menu={{items: items(props.items)}}>
                <Button>Action</Button>
            </Dropdown>

            <DeviceDetails setDeviceDetail={setDeviceDetail} deviceDetail={deviceDetail} selectedRow={selectedRow}/>
        </div>
    )
}