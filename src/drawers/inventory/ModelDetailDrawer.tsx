import { Tabs, TabsProps } from "antd";
import { Model } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import ModelNotes from "../../components/inventory/model/ModelNotes";
import ModelOverview from "../../components/inventory/model/ModelOverview";
import ModelStock from "../../components/inventory/model/ModelStock";

interface Props {
  model: Model;
}

export const ModelDetailDrawer = ({ model }: Props) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <ModelOverview model={model} />,
    },
    {
      key: "2",
      label: "Stock",
      children: <ModelStock devices={model.devices} />,
    },
    {
      key: "3",
      label: "Notes",
      children: <ModelNotes model={model} />,
    },
  ];

  return (
    <CustomDrawer title={model.name} width={850}>
      <Tabs defaultActiveKey="1" items={items} />
    </CustomDrawer>
  );
};
