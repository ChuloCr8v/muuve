import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Slider } from "antd";
import { useEffect, useState } from "react";
import OnboardingLayout from "../../component/onboarding/OnboardingLayout";

const ProjectManagementCostData = [
  {
    label: "Basic",
    price: 400000,
  },
  {
    label: "Standard",
    price: 400000,
  },
  {
    label: "Premium",
    price: 400000,
  },
];

const IncidentManagementCostData = [
  {
    label: "Basic",
    price: 400000,
  },
  {
    label: "Standard",
    price: 400000,
  },
  {
    label: "Premium",
    price: 400000,
  },
];

const productsCostData = [
  { id: "PM", label: "Project Management", data: ProjectManagementCostData },
  { id: "IM", label: "Project Management", data: IncidentManagementCostData },
];

const ProductsCustomization = () => {
  return (
    <div>
      <OnboardingLayout
        steps
        currentStep={4}
        totalSteps={5}
        children={<Children />}
        heading={"Customize your products"}
        subheading={"You can customize your selected products"}
      />
    </div>
  );
};

export default ProductsCustomization;

const Children = () => {
  const [selectedProducts, setSetSelectedProducts] = useState<Array<string>>(
    []
  );
  const [productTiers, setProductTiers] = useState([]);

  const products = localStorage.getItem("selectedProducts");
  const product = products ? JSON.parse(products) : [];

  useEffect(() => {
    setSetSelectedProducts(product);
  }, []);

  const p = productsCostData.filter((sp) =>
    selectedProducts.some((pd) => pd === sp.id)
  );

  useEffect(() => {
    setProductTiers(p);
  }, [selectedProducts]);

  return (
    <div className="grid gap-6">
      {selectedProducts.includes("BS") && <BillingComponent />}
      {productTiers.map(
        (p: {
          label: string;
          id: string;
          data: Array<{ label: string; price: number }>;
        }) => (
          <TierComponent label={p.label} key={p.id} plans={p.data} />
        )
      )}
      <Button type="primary" className="w-[144px] place-self-end">
        Proceed
      </Button>
    </div>
  );
};

const ProductHeading = (props: { productLabel: string; subtitle: string }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="space-y-1 w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-base">{props.productLabel}</p>
          <div className="text-red-500 hover:text-red-600 duration-200 font-semibold">
            <MinusCircleOutlined /> <span className="">Remove</span>
          </div>
        </div>

        <p className="text-grey">{props.subtitle}</p>
      </div>
    </div>
  );
};

// Billing Service Component

const BillingComponent = () => {
  const [customerCount, setCustomerCount] = useState(0);
  return (
    <div className="flex items-center gap-8">
      <div className="grid gap-4 w-[480px]">
        <ProductHeading
          productLabel={"Billing"}
          subtitle={
            "The selected number of customer seats will determine the price."
          }
        />

        <div className="w-full grid gap-4">
          <div className="w-full flex items-center gap-6">
            <label htmlFor="" className="text-nowrap font-[500]">
              Customer Seats
            </label>
            <Slider
              className="w-full"
              value={customerCount}
              defaultValue={customerCount}
              onChange={(value) => setCustomerCount(value)}
            />
            <Input
              min={0}
              className="w-fit"
              value={customerCount}
              type="number"
              onChange={(e) => setCustomerCount(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between font-semibold text-base">
            <p className="">Amount</p>
            <p className="text-primary font-bold">NGN 400,000</p>
          </div>
        </div>
      </div>
      <SingleProductSummaryCard />
    </div>
  );
};

//Tier Pricing Card

const TierComponent = (props: {
  label: string;
  plans: Array<{ label: string; price: number }>;
}) => {
  return (
    <div className="w-full flex items-start gap-8">
      <div className="grid gap-4 border-t pt-4 ">
        <ProductHeading
          productLabel={props.label}
          subtitle={"Select any plan of choice"}
        />
        <div className="flex items-center gap-4">
          {props.plans.map((plan) => (
            <div className="group border rounded-lg p-4 w-[150px] grid gap-2 hover:border-primary cursor-pointer duration-200">
              <p className="font-semibold text-base">{plan.label}</p>
              <p className="font-semibold text-primary">
                NGN{plan.price.toLocaleString()}
              </p>
              <Button className="group-hover:border-primary w-full">
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
      <SingleProductSummaryCard />
    </div>
  );
};

const SingleProductSummaryCard = () => {
  const summaryData = [
    { label: "Billing Cycle", value: "Monthly" },
    { label: "Sub Total", value: 400000 },
    { label: "VAT", value: 2000 },
  ];

  return (
    <div className="border rounded-md p-4 pb-2 w-[400px] h-full flex flex-col">
      <div className="h-full space-y-1">
        {summaryData.map((data) => (
          <div className="flex items-center justify-between" key={data.label}>
            <p className="text-grey">{data.label}</p>
            <p className="font-[500]">
              {data.label !== "Billing Cycle" && "NGN"}
              {data.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-2 mt-6">
        <p className="font-[500]">Total</p>
        <p className="text-primary font-[500]">NGN 400000</p>
      </div>
    </div>
  );
};
