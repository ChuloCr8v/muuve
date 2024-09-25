import {
  Button,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
} from "antd";
import { useState } from "react";
import ActionPopup from "../../component/Global/ActionPopup";
import Danger from "/public/dangerSvg.svg";
import { DownOutlined, FormOutlined, OrderedListOutlined, SearchOutlined,WarningOutlined } from "@ant-design/icons";
import Header from "../../component/Global/Header";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import MaintenanceTable from "../../component/TableItems/columns/MiantenanceTable";
import ScheduleForm from "../../component/operations/maintenance/ScheduleForm";
import EmmergencyForm from "../../component/operations/maintenance/EmmergencyForm";




export default function Maintenance() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState(false);
  const [selectedForm, setSelectedForm] = useState('')

  const switchForm = (key: any) => {
    setSelectedForm(key)
    setNewMaintenance(true)
  }


  const summaryCard = [
    {
      label: "Total",
      value: 22,
      icon: <OrderedListOutlined />,
    },
    {
      label: "Active",
      value: 19,
      icon: <VscVmActive />,
    },
    {
      label: "Deactivated",
      value: 2,
      icon: <FaBan />,
    },
    {
      label: "Expiring",
      value: 1,
      icon: <WarningOutlined />,
    },
  ];

  const render = () =>{
    const key = parseInt(selectedForm)
    switch (key) {
      case 1:
        return <ScheduleForm/> ;
      case 2: 
        return <EmmergencyForm/>;
      default: 
        return null;
    }

  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Scheuduled Miantenance',
      onClick: () => switchForm('1'),
      icon: <FormOutlined />
    },
    {
      key: '2',
      label: 'Emmergency Miantenance',
      onClick: () => switchForm('2'),
      icon: <WarningOutlined />,
    },
  ]

 
  return (
    <div className="space-y-[16px]">
      <div className="flex items-center justify-between">
        <Header heading={"Maintenance"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[300px]" prefix={<SearchOutlined />} />
          <Button>Generate Report</Button>
          <Button>Refresh</Button>

          <Dropdown menu={{items}} trigger={['hover']}>
          <Button
           
            className="flex items-center "
            type="primary"
          >
            <span>Add Maintenance</span>
            <DownOutlined />
          </Button>
          </Dropdown>
        </section>
      </div>

      <SummaryCards  summaryData={summaryCard}/>

      <MaintenanceTable />


      <Drawer width={450} open={newMaintenance} onClose={() => setNewMaintenance(false)}>{render()}</Drawer>

     
    </div>
  );
}
