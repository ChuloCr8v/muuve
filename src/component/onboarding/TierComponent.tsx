import { Button } from "antd";
import { ProductsDataTypes, TierTypes } from "../../dummy/productsData";
import ProductHeading from "./ProductHeading";
import { SelectedProductSummaryType } from "./ProductsCustomizationComponent";
import { twMerge } from "tailwind-merge";

type Props = {
  selectedProducts: ProductsDataTypes[];
  setSelectedProducts: (arg: ProductsDataTypes[]) => void;
  data: ProductsDataTypes;
  duration: string;
  id: string;
  selectedProductsSummary: Array<SelectedProductSummaryType>;
  setSelectedProductsSummary: (arg: SelectedProductSummaryType[]) => void;
};

const TierComponent = (props: Props) => {
  const { duration, data } = props;

  //Get tier pricing according to duration selected(monthly/yearly)
  const plans = () => {
    switch (duration) {
      case "monthly":
        return data.pricing?.monthly;
      case "yearly":
        return data.pricing?.yearly;
      default:
        return [];
    }
  };

  const handleSelect = (
    productName: string,
    productId: string,
    plan: TierTypes
  ) => {
    // Find if the plan is already in the selected products summary
    const findPlan = props.selectedProductsSummary.find(
      (item) => item.productId === productId
    );

    const planDetails = {
      id: plan.id,
      productId: productId,
      tierLabel: plan.label,
      tierValue: plan.value,
      product: productName,
    };

    if (findPlan) {
      // Plan exists already, so update it
      const updatedPlan = Object.assign(findPlan, planDetails);

      props.setSelectedProductsSummary((prev) =>
        prev.map((item) => (item.productId === productId ? updatedPlan : item))
      );
    } else {
      // Plan does not exist, so add it to the summary
      props.setSelectedProductsSummary((prev) => [...prev, planDetails]);
    }
  };

  //check if plan is selected and style plan card according
  const verifySelectedPlan = (productId: string, id: number) => {
    const findProduct = props.selectedProductsSummary.find(
      (item) => item.productId === productId
    );
    return findProduct && findProduct.id === id;
  };

  return (
    <div className="w-full h-full flex items-start gap-8">
      <div className="grid gap-4">
        <ProductHeading
          productLabel={props.data.label}
          subtitle={"Select any plan of choice"}
          selectedProducts={props.selectedProducts}
          setSelectedProducts={props.setSelectedProducts}
          setSelectedProductsSummary={props.setSelectedProductsSummary}
          selectedProductsSummary={props.selectedProductsSummary}
          id={props.id}
        />
        <div className="flex items-center gap-4">
          {plans()?.map((plan) => (
            <div
              onClick={() =>
                handleSelect(props.data.label, props.data.id, plan)
              }
              key={plan.id}
              className={twMerge(
                "group border rounded-lg p-4 w-[150px] grid gap-2 hover:border-primary cursor-pointer duration-200",
                verifySelectedPlan(props.data.id, plan.id) && "border-primary"
              )}
            >
              <p className="font-semibold text-base capitalize">{plan.label}</p>
              <p className="font-semibold text-primary">
                NGN{" "}
                {props.duration === "monthly"
                  ? plan.value.toLocaleString()
                  : plan.value.toLocaleString()}
              </p>
              <Button
                className={twMerge(
                  "group-hover:border-primary w-full",
                  verifySelectedPlan(props.data.id, plan.id) &&
                    "border-primary text-primary font-semibold"
                )}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TierComponent;
