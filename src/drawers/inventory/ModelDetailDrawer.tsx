import { Tabs, TabsProps } from "antd";
import { Model } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import ModelOverview from "../../components/inventory/model/ModelOverview";
import ModelStock from "../../components/inventory/model/ModelStock";
import ModelNotes from "../../components/inventory/model/ModelNotes";

interface Props {
  model: Model;
}

export const ModelDetailDrawer = ({ model }: Props) => {
  // const modelDetails = model;
  // const setModelDetails = model;
  // const selectedRow = model;
  // const [activeTab, setActiveTab] = useState("Overview");

  // const handleTabClick = (tab: any) => {
  //   setActiveTab(tab);
  // };

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
      label: "History",
      children: <ModelStock devices={model.devices} />,
    },
    {
      key: "4",
      label: "Notes",
      children: <ModelNotes model={model} />,
    },
  ];

  return (
    <CustomDrawer title={model.name} width={850}>
      {/* {activeTab === "Overview" ? (
        <ModelOverview data={selectedRow} />
      ) : activeTab === "Stock" ? (
        <ModelStock data={selectedRow} />
      ) : activeTab === "History" ? (
        <ModelHistory data={selectedRow} />
      ) : (
        <div>Hello</div>
        // <Notes data={selectedRow} />
      )}
 */}

      <Tabs defaultActiveKey="1" items={items} />
    </CustomDrawer>
  );
};
