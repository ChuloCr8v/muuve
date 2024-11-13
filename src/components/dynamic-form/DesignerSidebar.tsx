import useDesigner from "@/hooks/useDesigner";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="flex flex-col flex-grow h-full gap-2 overflow-y-auto bg-white">
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
