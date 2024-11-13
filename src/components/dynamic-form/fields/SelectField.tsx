import useDesigner from "@/hooks/useDesigner";
import { Button, Form, Input, Select, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { ElementsType, FormElement, FormElementInstance } from "./FormElement";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const type: ElementsType = "SelectField";

const extraAttributes = {
  label: "Label...",
  helperText: "Helper text...",
  required: false,
  placeHolder: "Placeholder...",
  options: [],
};

export const SelectFieldFormElememt: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: RxDropdownMenu,
    label: "Select Field",
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
  const { label, required, placeHolder, helperText, options } =
    element.extraAttributes;
  return (
    <div className="w-full">
      <Form layout="vertical">
        <Form.Item label={label} extra={helperText} required={required}>
          <Select disabled placeholder={placeHolder} options={options} />
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
  const { label, required, placeHolder, helperText, options } =
    element.extraAttributes;
  return (
    <Form.Item
      label={label}
      name={element.id}
      rules={[{ required, message: helperText }]}
    >
      <Select placeholder={placeHolder} options={options} />
    </Form.Item>
  );
}

type propertiesFormSchemaType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
  options: any[];
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
    const { label, helperText, placeHolder, required, options } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
        options,
      },
    });
  }

  function handleBlur() {
    form.submit();
  }

  function handleFinish(values: propertiesFormSchemaType) {
    applyChanges(values);
  }

  const initialValues: propertiesFormSchemaType = {
    label: element.extraAttributes.label,
    helperText: element.extraAttributes.helperText,
    placeHolder: element.extraAttributes.placeHolder,
    required: element.extraAttributes.required,
    options: element.extraAttributes.options,
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item label="Label" name="label" extra="The label of the field">
        <Input onBlur={handleBlur} />
      </Form.Item>
      <Form.Item
        label="Placeholder"
        name="placeHolder"
        extra="The placeholder of the field"
      >
        <Input placeholder="Placeholder" onBlur={handleBlur} />
      </Form.Item>
      <Form.Item
        label="Helper Text"
        name="helperText"
        extra="The helper text of the field"
      >
        <Input onBlur={handleBlur} />
      </Form.Item>
      <Form.Item label="Options" name="options">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex w-full space-x-1">
                  <Form.Item {...restField} name={name}>
                    <Input placeholder="Option label" onBlur={handleBlur} />
                  </Form.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      remove(name);
                      handleBlur();
                    }}
                  >
                    <MdOutlineCancel size={24} className="text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                type="dashed"
                className="w-full"
                onClick={() => add("New Option")}
              >
                <AiOutlinePlus /> Add Option
              </Button>
            </div>
          )}
        </Form.List>
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
