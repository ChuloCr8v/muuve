import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

const FormElementSidebar = () => {
  return (
    <div className="grid grid-cols-1 gap-2 px-2 md:grid-cols-2 w-fit place-items-center">
      <SidebarBtnElement formElement={FormElements.TextField} />
      <SidebarBtnElement formElement={FormElements.NumberField} />
      <SidebarBtnElement formElement={FormElements.TextAreaField} />
      <SidebarBtnElement formElement={FormElements.DateField} />
      <SidebarBtnElement formElement={FormElements.SelectField} />
    </div>
  );
};

export default FormElementSidebar;
