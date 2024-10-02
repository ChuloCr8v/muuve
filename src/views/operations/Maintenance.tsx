import { Button, Drawer, Dropdown, Input, MenuProps } from "antd";
import { useState } from "react";
import {
  CheckOutlined,
  DownOutlined,
  FormOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Header from "../../component/Global/Header";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import MaintenanceTable from "../../component/TableItems/columns/MiantenanceTable";
import ScheduleForm from "../../component/operations/maintenance/ScheduleForm";
import EmmergencyForm from "../../component/operations/maintenance/EmmergencyForm";
import { Link } from "react-router-dom";

interface Prop {
  
}

export default function Maintenance() {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");

  const url = '/operations/maintenance/preview'

  const switchForm = (key: any) => {
    setSelectedForm(key);
    setNewMaintenance(true);
  };

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

  const render = () => {
    const key = parseInt(selectedForm);
    switch (key) {
      case 1:
        return <ScheduleForm />;
      case 2:
        return <EmmergencyForm />;
      default:
        return null;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Scheuduled Miantenance",
      onClick: () => switchForm("1"),
      icon: <FormOutlined />,
    },
    {
      key: "2",
      label: "Emmergency Miantenance",
      onClick: () => switchForm("2"),
      icon: <WarningOutlined />,
    },
  ];

  return (
    <div className="space-y-[16px] p-8">
      <div className="flex items-center justify-between">
        <Header heading={"Maintenance"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[300px]" prefix={<SearchOutlined />} />
          <Link to={url}>
          <Button>
              <span>Review Reports</span>
              <CheckOutlined/>
          </Button>
          </Link>
         
          <Button>Refresh</Button>

          {/* <Dropdown menu={{ items }} trigger={["hover"]}> */}
            <Button onClick={() => setNewMaintenance(true)} className="flex items-center " type="primary">
              <span>Add Maintenance</span>
              <PlusOutlined />
            </Button>
          {/* </Dropdown> */}
        </section>
      </div>

      <SummaryCards summaryData={summaryCard} />

      <MaintenanceTable />

      <Drawer
      closeIcon={null}
      title="Add Scheduled Maintenance"
        width={450}
        open={newMaintenance}
        onClose={() => setNewMaintenance(false)}
      >
       <ScheduleForm/>
      </Drawer>
    </div>
  );
}
