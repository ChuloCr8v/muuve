import { Form, Input, Radio } from "antd";
import { CiDiscount1 } from "react-icons/ci";
import CustomLabel from "../onboarding/CustomLabel";
import ActionPopup from "./ActionPopup";
import { Dispatch, SetStateAction, useState } from "react";

export interface DiscountFieldsDataType {
  id: number;
  label: string;
  value: number;
  type: string;
}

export const discountFormField = {
  id: 0,
  label: "",
  value: 0,
  type: "",
};

type Props = {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  discounts: Array<DiscountFieldsDataType>;
  setDiscounts: Dispatch<SetStateAction<DiscountFieldsDataType[]>>;
};

const DiscountModal = (props: Props) => {
  const [formData, setFormData] =
    useState<DiscountFieldsDataType>(discountFormField);
  const [count, setCount] = useState(0);

  const handleAddDiscount = () => {
    const customDiscountName = "DISCOUNT_" + count;

    const updatedFormData = {
      ...formData,
      label: formData.label || customDiscountName,
      id: count,
    };

    props.setDiscounts((prev) => [...prev, updatedFormData]);

    !formData.label && setCount(count + 1);

    setFormData(discountFormField);
    props.setIsOpen(false);
  };

  const handleUpdateFormData = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ActionPopup
      title="Add Discount"
      open={props.isOpen}
      onCancel={() => props.setIsOpen(false)}
      sendButtonText={"Add"}
      icon={<CiDiscount1 className="text-4xl" />}
      onOk={handleAddDiscount}
    >
      <Form layout="vertical" colon={false} className="space-y-3 pt-4">
        <Form.Item
          label={<CustomLabel label="Discount Title" extra="(Optional)" />}
        >
          <Input
            type="text"
            placeholder="enter discount title"
            name="label"
            onChange={(e) =>
              handleUpdateFormData(e.target.name, e.target.value)
            }
            value={formData.label}
          />
        </Form.Item>

        <Form.Item label={<CustomLabel label="Discount Amount" />}>
          <Input
            type="number"
            name="value"
            onChange={(e) =>
              handleUpdateFormData(e.target.name, Number(e.target.value))
            }
            placeholder="enter discount amount"
            suffix={formData.type === "percentage" ? "%" : "NGN"}
            value={formData.value}
          />
        </Form.Item>

        <Form.Item label={<CustomLabel label="Discount Type" />}>
          <Radio.Group
            name="type"
            onChange={(e) => handleUpdateFormData("type", e.target.value)}
            className="flex flex-col items-start gap-1"
            value={formData.type}
          >
            <Radio value="percentage">Percentage (%)</Radio>
            <Radio value="fixed">Fixed Amount (NGN)</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </ActionPopup>
  );
};

export default DiscountModal;
