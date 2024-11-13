import { useAddFormFieldMutation } from "@/api/dynamic-form.api";
import useDesigner from "@/hooks/useDesigner";
import { AppForms } from "@/types";
import { toastApiError } from "@/utils/error.util";
import { Button, message } from "antd";

interface Props {
  module: any;
  type: AppForms;
}

export const SaveFormBtn = ({ module, type }: Props) => {
  const { elements } = useDesigner();

  const [addField, { isLoading }] = useAddFormFieldMutation();

  const updateFormContent = async () => {
    const content = JSON.stringify(elements);
    addField({ content, module, type })
      .unwrap()
      .then(() => message.success("Form Updated"))
      .catch(toastApiError);
  };

  return (
    <div>
      <div>
        <Button type="primary" loading={isLoading} onClick={updateFormContent}>
          Save
        </Button>
      </div>
    </div>
  );
};

// [
//   {
//     id: "7352",
//     type: "TextField",
//     extraAttributes: {
//       label: "Customer Name",
//       helperText: "Customer name is required",
//       placeHolder: "input customer name",
//       required: true,
//     },
//   },
//   {
//     id: "1210",
//     type: "TextAreaField",
//     extraAttributes: {
//       label: "Service Description",
//       helperText: "Service description is required",
//       placeHolder: "Input service Description",
//       required: true,
//     },
//   },
//   {
//     id: "6249",
//     type: "DateField",
//     extraAttributes: {
//       label: "Service Date",
//       helperText: "service date is required",
//       placeHolder: "Pick service date",
//       required: true,
//     },
//   },
// ];
