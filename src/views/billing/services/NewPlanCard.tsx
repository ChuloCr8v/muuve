import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dispatch, Key, SetStateAction, useState } from "react";
import { FaRegTimesCircle, FaTrashAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { PlanDataType, ServiceFormDataTypes } from "./NewService";

type Props = {
  index: Key;
  plan: PlanDataType;
  plans: Array<PlanDataType>;
  setFormData: Dispatch<SetStateAction<ServiceFormDataTypes>>;
};

const NewPlanCard = (props: Props) => {
  const [featureCount, setFeatureCount] = useState(1);

  const handleRemoveFeature = (id: number) => {
    const updatedPlans = props.plans?.map((plan) => {
      if (plan.id === props.plan.id) {
        return {
          ...plan,
          tierFeatures: plan.tierFeatures.filter(
            (feature) => feature.id !== id
          ),
        };
      }
      return plan;
    });

    props.setFormData((prev) => ({
      ...prev,
      plans: updatedPlans,
    }));
  };

  const handleRemovePlan = () => {
    const filteredPlan = props.plans.filter(
      (plan) => plan.id !== props.plan.id
    );
    props.setFormData((prev) => ({ ...prev, plans: filteredPlan }));
  };

  const handleUpdatePlan = (name: string, value?: string | number) => {
    const updatedPlans = props.plans?.map((plan) => {
      if (plan.id === props.plan.id) {
        return {
          ...plan,
          [name]:
            name === "tierFeatures"
              ? [...plan.tierFeatures, { id: featureCount, value: "" }]
              : value,
        };
      }
      return plan;
    });

    if (name === "tierFeatures") {
      setFeatureCount(featureCount + 1);
    }

    props.setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  const handleUpdateFeatures = (id: number, value: string) => {
    const updatedPlans = props.plans?.map((plan) => {
      if (plan.id === props.plan.id) {
        const updatedTierFeatures = plan.tierFeatures?.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              value: value,
            };
          }
          return item;
        });

        return {
          ...plan,
          tierFeatures: updatedTierFeatures,
        };
      }

      return plan;
    });

    props.setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  const getPlanTitle = () => {
    switch (props.index) {
      case 0:
        return "basic";
      case 1:
        return "standard";
      case 2:
        return "premium";
      default:
        return "custom tier";
    }
  };

  return (
    <div className={twMerge("w-[300px] border-l remove-form-margin-bottom")}>
      <div className="h-full ">
        <div className="col-span-10 w-full h-full">
          <div className="bg-[#F8F8F8] border-b w-full h-10 flex items-center justify-between px-2">
            <p className="font-semibold capitalize text-sm">{getPlanTitle()}</p>
            <FaTrashAlt
              className="text-red-600 cursor-pointer"
              onClick={handleRemovePlan}
            />
          </div>

          <Form.Item
            className="border-b h-12 flex items-center justify-center"
            rules={[{ required: true, message: "Enter tier name" }]}
          >
            <Input
              className="w-[284px]"
              style={{ marginBottom: 0 }}
              placeholder="Enter tier name"
              name="tierName"
              value={props.plan.tierName}
              onChange={(e) => handleUpdatePlan(e.target.name, e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="h-20 flex items-center justify-center border-b remove-form-margin-bottom"
            rules={[{ required: true, message: "Provide a description" }]}
          >
            <TextArea
              style={{ resize: "none" }}
              className="w-[284px]"
              placeholder="Define what is offered in this tier"
              name="tierDescription"
              value={props.plan.tierDescription ?? props.plan.description}
              onChange={(e) => handleUpdatePlan(e.target.name, e.target.value)}
            />
          </Form.Item>

          <div className="">
            <div
              className={twMerge(
                "space-y-2",
                props.plan.tierFeatures?.length && "py-2"
              )}
            >
              {props.plan.tierFeatures?.map((feature) => (
                <Form.Item
                  key={feature.id}
                  className="flex items-center justify-center border-b pb-2"
                  rules={[{ required: true, message: "Cannot be empty!" }]}
                >
                  <Input
                    suffix={
                      <FaRegTimesCircle
                        onClick={() => handleRemoveFeature(feature.id)}
                        className="text-red-600"
                      />
                    }
                    onChange={(e) =>
                      handleUpdateFeatures(feature.id, e.target.value)
                    }
                    className="w-[284px] cursor-pointer"
                  />
                </Form.Item>
              ))}
            </div>

            <Button
              icon={<PlusCircleOutlined />}
              onClick={() => handleUpdatePlan("tierFeatures")}
              type="link"
              className="place-self-start text-primary"
            >
              Add Feature
            </Button>
          </div>
        </div>

        <Form.Item
          rules={[{ required: true, message: "Cannot be empty!" }]}
          className={twMerge(
            "h-12 flex flex-col items-center justify-center px-2 border-b border-r -mr-[1px] -mb-[1px]"
          )}
        >
          <Input
            prefix={<p className="text-gray-500">NGN</p>}
            className="w-[284px]"
            name="tierPrice"
            type="number"
            value={props.plan.tierPrice ?? props.plan.price}
            onChange={(e) => handleUpdatePlan(e.target.name, e.target.value)}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default NewPlanCard;
