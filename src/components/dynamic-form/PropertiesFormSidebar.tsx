import useDesigner from "@/hooks/useDesigner";
import { Button, Divider } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FormElements } from "./FormElements";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size="small"
          icon={<AiOutlineClose />}
          onClick={() => {
            setSelectedElement(null);
          }}
        />
      </div>
      <Divider className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
