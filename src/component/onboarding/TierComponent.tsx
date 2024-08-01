import { Button } from "antd";
import { ProductsDataTypes } from "../../dummy/productsData";
import ProductHeading from "./ProductHeading";
import SingleProductSummaryCard from "./SingleProductSummaryCard";

type Props = {
  data: ProductsDataTypes;
  duration: string;
};

const TierComponent = (props: Props) => {
  const { duration, data } = props;

  //Get tier pricing according to duration selected(monthly/yearly)
  const plans = () => {
    switch (duration) {
      case "monthly":
        return data.pricing.monthly;
      case "yearly":
        return data.pricing.yearly;
      default:
        return [];
    }
  };

  return (
    <div className="w-full flex items-start gap-8">
      <div className="grid gap-4 border-t pt-4 ">
        <ProductHeading
          productLabel={props.data.label}
          subtitle={"Select any plan of choice"}
        />
        <div className="flex items-center gap-4">
          {plans().map((plan) => (
            <div
              key={plan.label}
              className="group border rounded-lg p-4 w-[150px] grid gap-2 hover:border-primary cursor-pointer duration-200"
            >
              <p className="font-semibold text-base">{plan.label}</p>
              <p className="font-semibold text-primary">
                NGN
                {props.duration === "monthly"
                  ? plan.value.toLocaleString()
                  : (plan.value * 12).toLocaleString()}
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

export default TierComponent;
