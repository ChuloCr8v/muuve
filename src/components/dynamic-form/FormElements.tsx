import { DateFieldFormElememt } from "./fields/DateField";
import { NumberFieldFormElememt } from "./fields/NumberField";
import { SelectFieldFormElememt } from "./fields/SelectField";
import { TextAreaFormElememt } from "./fields/TextAreaField";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType =
  | "TextField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  formComponent: React.FC<{ elementInstance: FormElementInstance }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElememt,
  TextAreaField: TextAreaFormElememt,
  DateField: DateFieldFormElememt,
  SelectField: SelectFieldFormElememt,
};
