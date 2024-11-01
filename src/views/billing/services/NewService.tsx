import { Breadcrumb, Button, ConfigProvider, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Heading from "../../../components/global/Header";
import { billingCycle } from "../../../utils/billingCycle";
import CustomLabel from "../../../components/onboarding/CustomLabel";
import NewPlanCard from "./NewPlanCard";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { servicesData } from "../../../dummy/servicesData";
import { AddServicesInput, BillingCycle } from "../../../api/types";

const { Option } = Select;

const serviceFormFields = {
  id: "",
  serviceName: "",
  description: "",
  billingCycle: "",
  plans: [
    {
      id: 0,
      planName: "",
      tierName: "",
      tierDescription: "",
      tierFeatures: [{ id: 0, value: "" }],
      tierPrice: 0,
    },
  ],
  discount: {
    type: "",
    amount: 0,
  },
};

export interface PlanDataType {
  id: number;
  planName: string;
  tierName: string;
  tierDescription?: string;
  description?: string;
  tierFeatures: Array<{ id: number; value: string }>;
  tierPrice?: number;
  price?: number;
}

export interface ServiceFormDataTypes {
  id: string;
  serviceName: string;
  description: string;
  billingCycle: string;
  plans: Array<PlanDataType>;
  discount: {
    type: string;
    amount: number;
  };
}

const NewService = () => {
  const [formData, setFormData] =
    useState<AddServicesInput>({
      name: '',
      description: '',
      cycle: BillingCycle.MONTHLY,
      tiers: [],
      discount: undefined,
      discountType: undefined,
    });
  const [planCount, setPlanCount] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const currentServiceToEdit = servicesData.find((item) => item.id === id);
      setFormData(currentServiceToEdit as any);
    }
  }, [id]);

  const handleAddNewPlan = () => {
    const newPlanData = [
      ...formData.plans,
      {
        id: planCount,
        planName: "",
        tierName: "",
        tierDescription: "",
        tierFeatures: [{ id: 0, value: "" }],
        tierPrice: 0,
      },
    ];

    setFormData((prev) => ({
      ...prev,
      plans: newPlanData,
    }));

    setPlanCount(planCount + 1);
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const selectAfter = (
    <Select defaultValue="Percentage (%)">
      <Option value="Percentage (%)">Percentage (%)</Option>
      <Option value="Amount">Amount</Option>
    </Select>
  );

  return (
    <div className="p-8 space-y-4 bg-white w-full min-h-screen">
      <Breadcrumb
        items={[
          {
            title: "Services",
            href: "/billing/services",
          },
          {
            title: "New Service",
          },
        ]}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between w-full">
          <Heading
            heading={id ? `Edit ${formData.serviceName}` : "New Service"}
          />
          <Button type="primary" icon={<FaCheck />} iconPosition="end">
            Submit
          </Button>
        </div>

        <div className="grid gap-8">
          <Form className="max-w-[640px] w-full grid gap-6">
            <Form.Item
              layout="vertical"
              label={<CustomLabel label="Service Plan Name" required />}
              rules={[{ required: true, message: "Enter service title" }]}
            >
              <Input
                name="serviceName"
                type="text"
                value={formData.serviceName}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              layout="vertical"
              label={<CustomLabel label="Description" required />}
              rules={[{ required: true, message: "Enter service description" }]}
            >
              <TextArea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              layout="vertical"
              label={<CustomLabel label="Billing Circle" required />}
              className="max-w-[350px] w-full"
              rules={[
                {
                  required: true,
                  message: "Choose billing cycle for this service",
                },
              ]}
            >
              <Select
                onChange={(value: string) =>
                  handleInputChange("billingCycle", value)
                }
                value={formData.billingCycle}
                options={billingCycle.map((circle: any) => ({
                  label: circle.label,
                  value: circle.value,
                }))}
              />
            </Form.Item>
          </Form>

          <div className="grid space-y-4 mt-2">
            <p className="text-xs font-semibold text-gray-400 uppercase">
              Tiers
            </p>

            <div className="flex w-full h-full gap-2">
              {formData.plans?.length ? (
                <div className="flex h-full border w-fit rounded-t-md">
                  <div className="h-full">
                    <div className="h-full border-r w-[144px] bg-[#F8F8F8] text-sm">
                      <div className="flex items-center justify-center h-10 border-b"></div>
                      <div className="flex items-center justify-start w-32 h-12 pl-2 font-semibold border-b">
                        Tier Name
                      </div>
                      <div className="flex items-start pt-2 justify-start h-20 pl-2 font-semibold border-b">
                        Description
                      </div>
                      <div className="flex items-start justify-start h-full pt-1 pl-2 font-semibold border-b min-h-10">
                        Features
                      </div>
                    </div>
                    <div className="text-sm border h-12 pl-2 -ml-[1px] font-semibold flex items-center justify-start bg-[#F8F8F8] rounded-bl-md">
                      Price{" "}
                      {formData.billingCycle && (
                        <span className="capitalize pl-1">
                          ({formData.billingCycle})
                        </span>
                      )}
                    </div>
                  </div>

                  {formData.plans.map((plan, index) => (
                    <NewPlanCard
                      index={index}
                      plan={plan}
                      plans={formData.plans}
                      setFormData={setFormData}
                      key={plan.id}
                    />
                  ))}
                </div>
              ) : null}
              <div
                onClick={handleAddNewPlan}
                className={twMerge(
                  "h-full w-fit px-2 bg-primary bg-opacity-5 border border-primary rounded flex items-center justify-center",
                  formData.plans?.length === 3 && "hidden"
                )}
              >
                <BiPlusCircle className="text-lg cursor-pointer text-primary" />
              </div>
            </div>
          </div>

          {formData.plans?.length ? (
            <div className="grid gap-2 mt-14">
              <p className="text-[13px] font-[500]">Discount</p>
              <Form.Item className="md:w-[40%]">
                <Input addonAfter={selectAfter}/>
              </Form.Item>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default NewService;
