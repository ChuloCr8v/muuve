import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ProductsDataTypes, productsState, TierTypes } from "../../types";
import SingleProductCustomization from "../SingleProductCustomization";
import { customizedProducts } from "../../redux/productsSlice";

type Props = {
  data: ProductsDataTypes;
  id: string;
};

const TierComponent = (props: Props) => {
  const { duration, allSelectedProducts } = useSelector(
    (state: productsState) => state.products
  );
  const { data } = props;

  const dispatch = useDispatch();

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
    const planDetails = {
      id: plan.id,
      productId,
      tierLabel: plan.label,
      tierValue: plan.value,
      product: productName,
    };
    console.log(planDetails);
    // Plan does not exist, so add it to the summary
    dispatch(customizedProducts(planDetails));
  };

  //check if plan is selected and style plan card according
  const verifySelectedPlan = (productId: string, id: number) => {
    const findProduct = allSelectedProducts?.find(
      (item) => item.productId === productId
    );
    return findProduct && findProduct.id === id;
  };

  return (
    <div className="w-full h-full flex items-start gap-8">
      <SingleProductCustomization
        data={props.data}
        children={
          <div className="flex items-center gap-4">
            {plans()?.map((plan) => (
              <div
                onClick={() =>
                  handleSelect(props.data.label, props.data.id, plan)
                }
                key={plan.id}
                className={twMerge(
                  "group border rounded-lg p-4 max-w-[150px] w-full  grid gap-2 hover:border-primary cursor-pointer duration-200",
                  verifySelectedPlan(props.data.id, plan.id) && "border-primary"
                )}
              >
                <p className="font-semibold text-base capitalize">
                  {plan.label}
                </p>
                <p className="font-semibold text-primary">
                  N{" "}
                  {duration === "monthly"
                    ? plan.value.toLocaleString()
                    : plan.value.toLocaleString()}
                </p>
                <Button
                  className={twMerge(
                    "group-hover:border-primary w-full bg-transparent",
                    verifySelectedPlan(props.data.id, plan.id) &&
                      "border-primary text-primary font-semibold"
                  )}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export default TierComponent;
