import { SmModules } from "@/api/types";
import { Tabs } from "antd";
import FormBuilder from "./FormBuilder";

export default function FormConfig() {
  const items = [
    {
      key: "1",
      label: "Project Management",
      children: <FormBuilder module={SmModules.PROJECT} />,
    },
    {
      key: "2",
      label: "Inventory Management",
      children: <FormBuilder module={SmModules.INVENTORY} />,
    },
  ];
  return (
    <div className="min-h-screen overflow-hidden">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
