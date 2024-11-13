import useDesigner from "@/hooks/useDesigner";
import { Form, Input, InputNumber, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { Bs123 } from "react-icons/bs";
import { ElementsType, FormElement, FormElementInstance } from "./FormElement";

const type: ElementsType = "NumberField";

const extraAttributes = {
  label: "Label...",
  helperText: "Helper text...",
  required: false,
  placeHolder: "Placeholder...",
};

export const NumberFieldFormElememt: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: Bs123,
    label: "Number Field",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="w-full">
      <Form layout="vertical">
        <Form.Item extra={helperText} label={label} required={required}>
          <InputNumber
            className="w-full"
            readOnly
            disabled
            placeholder={placeHolder}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <Form.Item
      label={label}
      name={element.id}
      rules={[{ required, message: helperText }]}
    >
      <InputNumber className="w-full" placeholder={placeHolder} />
    </Form.Item>
  );
}

type propertiesFormSchemaType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const [form] = useForm<propertiesFormSchemaType>();

  useEffect(() => {
    form.resetFields();
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
      },
    });
  }

  function handleBlur() {
    form.submit();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") e.currentTarget.blur();
  }

  function handleFinish(values: propertiesFormSchemaType) {
    applyChanges(values);
  }

  const initialValues: propertiesFormSchemaType = {
    label: element.extraAttributes.label,
    helperText: element.extraAttributes.helperText,
    placeHolder: element.extraAttributes.placeHolder,
    required: element.extraAttributes.required,
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item label={"Label"} name="label" extra="The label of the field">
        <Input onBlur={handleBlur} onKeyDown={handleKeyDown} />
      </Form.Item>
      <Form.Item
        label={"Placeholder"}
        name="placeHolder"
        extra="The placeholder of the field"
      >
        <Input
          placeholder={"Placeholder"}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </Form.Item>
      <Form.Item
        label={"Helper Text"}
        extra="The helper text of the field"
        name="helperText"
      >
        <Input onBlur={handleBlur} onKeyDown={handleKeyDown} />
      </Form.Item>
      <Form.Item
        label={"Required"}
        name="required"
        extra="Check if field is required"
        className="p-1 border-2 rounded-xl"
      >
        <Switch onChange={handleBlur} />
      </Form.Item>
    </Form>
  );
}
