import { Button } from "antd";
import SingleProductSummaryCard from "./SingleProductSummaryCard";
import { useSelector } from "react-redux";
import { productsState, SelectedProductSummaryType } from "../../types";

const SummaryComponent = () => {
  const { duration, allSelectedProducts } = useSelector(
    (state: productsState) => state.products
  );

  const subTotal = allSelectedProducts.reduce(
    (sum: number, current: { tierValue: number }) => sum + current.tierValue,
    0
  );

  console.log(subTotal);
  return (
    <div className="grid grid-cols-2 justify-center w-full gap-4">
      {
        //Check index.css for summary-cards extra style
      }
      <div className="border h-fit rounded-lg p-4 summary-cards">
        {allSelectedProducts.map((product: SelectedProductSummaryType) => (
          <div className="grid gap-2" key={product.id}>
            <h3 className="font-semibold text-base">{product.product}</h3>
            <div className="text-sm flex justify-between items-center space-y-2">
              <p className="text-grey">
                {product.productId === "BS" ? "Customer Seats" : "Plan"}
              </p>
              <p className="text-black font-[500] capitalize">
                {product.tierLabel}
              </p>
            </div>
            <div className="text-sm flex justify-between items-center">
              <p className="text-grey">Amount</p>
              <p className="text-black font-semibold">
                {" "}
                NGN {product.tierValue.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between gap-6 items-end">
        {" "}
        <SingleProductSummaryCard subTotal={subTotal} duration={duration} />
        <Button type="primary" className="w-[124px] font-semibold">
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default SummaryComponent;
