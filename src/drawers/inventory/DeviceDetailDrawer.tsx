import { Tabs, TabsProps } from "antd";
import { Device } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import LogComponent from "../../components/global/Log";
import DeviceNotes from "../../components/inventory/devices/DeviceNotes";
import DeviceOverview from "../../components/inventory/devices/DeviceOverview";

interface Props {
  device: Device;
}

export const DeviceDetailDrawer = ({ device }: Props) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <DeviceOverview device={device} />,
    },
    {
      key: "2",
      label: "History",
      children: <LogComponent logs={device.logs} />,
    },
    {
      key: "3",
      label: "Notes",
      children: <DeviceNotes device={device} />,
    },
  ];

  return (
    <CustomDrawer title={device.name} width={850}>
      <Tabs defaultActiveKey="1" items={items} />
    </CustomDrawer>
  );
};
