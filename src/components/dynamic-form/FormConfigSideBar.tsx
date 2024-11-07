import { SmModules } from "@/api/types";
import { AppForms } from "@/types";
import { formatStatusEnum } from "@/utils/formatEnum";
import { Tabs } from "antd";
import DesignerSidebar from "./DesignerSidebar";

interface Props {
  module: SmModules;
  setFormName: React.Dispatch<React.SetStateAction<AppForms>>;
}

const moduleForms: Record<SmModules, AppForms[]> = {
  [SmModules.PROJECT]: [AppForms.REQUEST_SURVEY, AppForms.CREATE_JOB_ORDER],
  [SmModules.INVENTORY]: [],
};

const FormConfigSideBar = ({ setFormName, module }: Props) => {
  const menuItems = moduleForms[module] || [];

  const FormSideBar = () => {
    return (
      <div className="px-2 space-y-2">
        {menuItems.map((item, idx) => (
          <p
            key={idx}
            className="duration-300 cursor-pointer hover:text-primary hover:font-semibold"
            onClick={() => setFormName(item)}
          >
            {formatStatusEnum(item)}
          </p>
        ))}
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Element",
      children: <DesignerSidebar />,
    },
    {
      key: "2",
      label: "Forms",
      children: <FormSideBar />,
    },
  ];
  return (
    <div className="px-2 bg-white  w-[400px] max-w-[280px]">
      <Tabs items={items} defaultActiveKey="1" />
    </div>
  );
};

export default FormConfigSideBar;
